(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);



	function HomeFactory($http, $q) {
		var o = {};

		o.getToDos = function(){
			var q = $q.defer();
			$http.get("/api/v1/todo").then(function(res){ // this .get has to match what we're allowed to do within the router itself. we made it a get there. "router.get("/", function(req,res){"  | .then in angular packages up the response in a certain way that gives us .data which the information that we need in this case (and many cases - its the data itself)
				q.resolve(res.data); // we need to resolve the promise
			});
			return q.promise;
		};

		o.createToDo = function(newToDo){
			var q = $q.defer();
			// $http.verb("url", body)
			$http.post("/api/v1/todo", newToDo).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteToDo = function(todo){
			var q = $q.defer();
			$http.delete("/api/v1/todo/" + todo.id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		o.completeToDo = function(todo){
			var q = $q.defer();
			$http.put("/api/v1/todo/" + todo.id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		o.uncompleteToDo = function(todo){
			var q = $q.defer();
			$http.patch("/api/v1/todo/" + todo.id).then(function(){ // normally you would NOT want to do a patch, esp when we have put for completeToDo()
			q.resolve();
		});
			return q.promise;
		};

		return o;
	}
})();
