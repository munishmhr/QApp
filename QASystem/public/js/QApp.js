/*
  This class is called in boot file as redirecting to view which should be represent to user
  when "/" address is asked.
*/

define(['router'], function(router) {
  var initialize = function() {
    bootup();
  };

  var bootup = function(){
   	window.location.hash = 'index';
   	Backbone.history.start();
  }
  
  return {
    initialize : initialize
  };

});
