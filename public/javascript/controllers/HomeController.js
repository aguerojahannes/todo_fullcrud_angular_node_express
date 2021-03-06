(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);
	function HomeController(HomeFactory) {
		var vm = this;
		vm.newToDo = {};


		HomeFactory.getToDos().then(function(data){ // run this function, then once we resolve this promise do this
			vm.todos = data;
		});

		vm.addToDo = function(){
			HomeFactory.createToDo(vm.newToDo).then(function(res){
				vm.newToDo = res;
				vm.todos.push(vm.newToDo);
				vm.newToDo = {}; // clears out empty object
			});
		};

		vm.deleteToDo = function(todo){
			HomeFactory.deleteToDo(todo).then(function(){ //didn't pass in res
				vm.todos.splice(vm.todos.indexOf(todo),1);
			});
		};

		vm.completeToDo = function(todo){
			HomeFactory.completeToDo(todo).then(function(){
				todo.completed = new Date();
			});
		};

		vm.uncompleteToDo = function(todo){
			HomeFactory.uncompleteToDo(todo).then(function(){
				todo.completed = null;
			});
		};

	}
})();
