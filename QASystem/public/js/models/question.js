define(function(require) {
  var question = Backbone.Model.extend({
  	
    url: function(){
    	var url = '/index/' + this.subtechnology;
	    return url;
    },	

    initialize : function(options){
    	this.subtechnology = options.subtechnology;
    	this.url();
    }

  });
  //console.log(this.subtechnology);
  return question;
});
