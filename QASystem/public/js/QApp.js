define(['router'], function(router) {
	var initialize = function() {
		console.log("QApp.js::initialize");
		bootup();
	};

	var bootup = function() {
		console.log("QApp.js::bootup");
		window.location.hash = 'index';
		Backbone.history.start();
	};
  
	return {
		initialize : initialize
	};
});
