import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//render the main page
app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});