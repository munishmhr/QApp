define(['text!templates/reviewQuestionIndexLeftPane.html','models/reviewQuestionCollection'], 
	function(indexTemplate,QuestionCollection) {
	
	    var enterQuestionIndexLeftPane = Backbone.View.extend({

	    render: function() {

	    	//console.log(this.model.toJSON());

	    	this.$el.html(_.template(indexTemplate,this.model.toJSON()));
	    	 return this;     
		    }	
		});

return enterQuestionIndexLeftPane;
});

