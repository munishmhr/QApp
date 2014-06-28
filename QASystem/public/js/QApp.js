define(['router'], function(router) {
  var initialize = function() {
  	console.log("inside QApp.js");
    bootup();
  };

   var bootup = function(){
   	window.location.hash = 'index';
   	Backbone.history.start();
   };
  
  return {
    initialize : initialize
  };

});
