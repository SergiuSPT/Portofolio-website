import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Needed so __dirname works with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//render the main page
app.get('/', (req, res) => {
   res.render("index.ejs", { sent: req.query.sent });
});

app.get('/portofolio', (req, res) => {
    res.render("portofolio.ejs");
});

app.get('/ro', (req, res) => {
    res.render("index_ro.ejs");
});


app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, "public/files/CV_Sergiu_Spatar.pdf");

    res.download(filePath, "CV_Sergiu_Spatar.pdf", (err) => {
        if (err) {
            console.error("Download failed:", err);
            res.status(500).send("Could not download the file.");
        }
    });
});

app.post("/submit", async (req, res) => {
    const { email, message } = req.body;

    try {
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { email: process.env.MY_EMAIL },
                to: [{ email: process.env.MY_EMAIL }],
                replyTo: { email },
                subject: "New Contact Form Submission",
                htmlContent: `
                    <p><strong>From:</strong> ${email}</p>
                    <p><strong>Message:</strong><br>${message}</p>
                `,
            },
            {
                headers: {
                    "accept": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json",
                },
            }
        );

        res.redirect("/?sent=true");
    } catch (error) {
        console.error("Email sending error:", error.response?.data || error);
        res.redirect("/?sent=false");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});