import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import nodemailer from "nodemailer";
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
    const filePath = path.join(__dirname, "public/files/CV_Spatar_Sergiu_Razvan.pdf");

    res.download(filePath, "CV_Spatar_Sergiu_Razvan.pdf", (err) => {
        if (err) {
            console.error("Download failed:", err);
            res.status(500).send("Could not download the file.");
        }
    });
});

app.post("/submit", async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).send("Missing email or message.");
    }

    try {
        // Email transporter configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_EMAIL_PASSWORD
            }
        });

        // Email content
        const mailOptions = {
            from: `"Portfolio Website" <${process.env.MY_EMAIL}>`,
            replyTo: email,
            to: process.env.MY_EMAIL,
            subject: "New Contact Request",
            text: `From: ${email}\n\nMessage:\n${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully.");
        res.redirect("/?sent=true"); // Redirect back with a success flag

    } catch (error) {
        console.error("Email sending error:", error);
        res.redirect("/?sent=false");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});