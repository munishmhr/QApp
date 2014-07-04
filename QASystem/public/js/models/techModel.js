/*
  Model for technology collection , 
  If address like /index/subtechnology is requested, when collection is initiated 
  initialize method will be exicuted first new URL will be return.
*/

define(function(require) {
  var tech = Backbone.Model.extend({

  	url: function(){
    	var url = '/index/' + this.technology;
	    return url;
    },	

    initialize : function(options){
    	if(options){
	    	this.technology = options.technology;
	    	this.url();
	    }
    }

  });
	//console.log("tech.js");
  return tech;
});
