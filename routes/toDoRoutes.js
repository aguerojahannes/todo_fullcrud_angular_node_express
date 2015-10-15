var express = require("express");
var router = express.Router(); // capitalized. dont know why. create a router with its own routes and  rules
var uuid = require("uuid");
var todos = []; // holds all of out dotods

function ToDo(title, body){
   this.title = title;
   this.body = body;
   this.created = new Date();
   this.completed = null;
   this.id = uuid.v4();
}
todos.push(new ToDo("Work on HTML", "You need to do your homework all the way. It's best if you stay after school"), new ToDo("Angular", "Study past projects and try to make them better"), new ToDo("Stretch on Breaks", "Get up off the computer. Stretch pecs, pec minor, SCM, scalenes"));

// MIDDLEWARE - start point and end point of a request
// this makes our code simple in our routes below
router.param("id", function(req,res, next, id){ // any time we see the param id in a route (:id), we're going to use this function
      for(var i=0; i <todos.length; i++){
         if(id === todos[i].id){
            req.todo = todos[i]; // adding on a property to the req keyword.
            return next();
         }
      }
      res.status(400).send({err: "Could not that that to do."});
});

// GET /api/v1/todo
router.get("/", function(req,res){ // prefixed (/api/v1/todo) created in the server
   res.send(todos);
});

//POST /api/v1/todo
router.post("/", function(req,res){
   var todo = new ToDo(req.body.title, req.body.body); // holding everything from on the client side
   console.log(req.body); // only holds title and body of input, not the other things we are creating, like new Date() and deleted and id
   todos.push(todo);
   res.send(todo); // so far we're saving this to the server, but not the user, until we push it into the array..
});

router.delete("/:id", function(req,res){ // we have an express  middleware called param. that specifies if i have id as a parameter, then run a function (one that we could put in this delete request, but don't want to because 1) we're using it multiple times, and 2) we want to simplify this request), then carry on with this request, in this case a splice.
   todos.splice(todos.indexOf(req.todo),1);
   res.send();
});

router.put("/:id", function(req,res){
   req.todo.completed = new Date();
   res.send();
});

   router.patch("/:id", function(req,res){
      req.todo.completed = null;
      res.send();
});

module.exports = router;
