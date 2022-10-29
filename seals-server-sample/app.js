/**
 * Root for our server
 */

// this port for our sever
const PORT = 3000;
// import express framework
const express = require("express");
// create instance of express so we can define our routes
const app = express();
// import body parser
const bodyParser = require("body-parser");
// import mongoose
const mongoose = require("mongoose");

/**
 * Handles db connection
 */
async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(
      "mongodb+srv://Bryan_09:Marjorie09@cluster0.1s3nx6k.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("we connected");
  } catch (error) {
    console.log(error);
    // add handler to deal with db connection error
  }
}

// run the function to connect
connectToDb();

/**
 * Define what data our pizza object will hold
 */
const scoreSchema = new mongoose.Schema({
  score: { type: Number, required: false }, // required =false
  name:[],
});

const Score = mongoose.model("score", scoreSchema);

// middleware - does things for us that save time and code
app.use(bodyParser.json());

// define a GET request endpoint/API/requests
// CRUD - READ
app.get("/score", (req, res) => {
  async function getAllScores() {
    try {
      // find will ALWAYS RETURN ARRAY
      const allScores = await scoresModel.find({ price: 10000 });
      // send back pizza data and status ok
      res.status(200).send({
        message: "ok",
        payload: allScores,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getAllScores();
});

app.post("/get-single-scores", (req, res) => {
  const data = req.body;

  console.log(data.id);

  
  async function getScores() {
    try {
      // findOne will alwasy return one item or null
      const scores = await scoreModel.findById();

      // send back pizza data and status ok
      res.status(200).send({
        message: "ok",
        payload: scores,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getScores();
});

// define a POST request
// CRUD - C
app.post("/add-scores", (request, response) => {
  // grab the new pizza info
  const data = request.body;

  async function makeScores() {
    try {
      // create a new pizza in the database
      const newScores = await scoresModel.create({
        price: data.price,
        toppings: data.toppings,
        sides: data.sides,
      });

      // send back pizza data and status ok
      response.status(200).send({
        message: "ok",
        payload: newScores,
      });
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  makeScores();
});
app.delete("/delete-score/:id", (req, res) => {
  const data = req.body;
  async function deleteScore() {
    try {
      scoreModel.findByIdAndDelete({ _id: req.params._id }, data).then(() => {
        res.status(200).send({
          msg: 'Deleted Score'
        })
      })
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }
  deleteScore();
});
app.put("/update-score/:id", (request, response) => {
  const data = req.body;
  async function updateScore() {
    try {
      scoreModel.findByIdAndUpdate({ _id: req.params._id }, data).then(() => {
        res.status(200).send({
          msg: 'Updated Score'
        })
      })
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }
  updateScore();
});













// server listens on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT);
  console.log(`localhost:${PORT}`);
});
