const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Quote = require('inspirational-quotes');


let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(3000, function(req, res){
  console.log("The server listens at port 3000.");
});

var todolist = ["Buy Groceries", "Make Lunch", "Call Mom"];

app.get("/", function(req, res){
  let date = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
  let today = date.toLocaleString("en-US", options);
  let quote = Quote.getRandomQuote();


  res.render("list", {
    thisDay: today,
    todolistitems: todolist,
    wisdom: quote
  });

  app.post("/", function(req, res){
    let newItem = req.body.newTodo;
    todolist.push(newItem);
    console.log(todolist);
    res.redirect("/");
  })

});
