import express from "express"
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advise = response.data.slip.advice;
    console.log (response.data);
    res.render('layout', {
      content: 'home',
      advise
    });
  } catch (error) {
    console.log(`Failed to fetch : ${error}`);
    res.render('layout', {
      content: 'home', 
      advise: "The advise backet is at work with new bits of information "
    });
  }
});


app.listen(port, () => {
  console.log(`Listinig on port : ${port}`)
})