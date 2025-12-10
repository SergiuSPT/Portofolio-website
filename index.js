import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// Needed so __dirname works with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//render the main page
app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/portofolio', (req, res) => {
    res.render("portofolio.ejs");
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});