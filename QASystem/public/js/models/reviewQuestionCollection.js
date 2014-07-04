/*
    Collection for getting data from node @ address /reviewquestions/.
*/

define(['models/reviewQuestionModel'], function(reviewquestion) {
  var TechCollection = Backbone.Collection.extend({
    model: reviewquestion,
    url : '/reviewquestions/',

    url: function(){
    	var url = '/index/' + this.subtechnology;
	    return url;
    },	

    initialize : function(options){
    	if(options!=null){
    		this.subtechnology = options.subtechnology;
    		this.url();
    	}else{
    		this.url = '/reviewquestions/';
    	}
    	
    }

  });
  return TechCollection;
});