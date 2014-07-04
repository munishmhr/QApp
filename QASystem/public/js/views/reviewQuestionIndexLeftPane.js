/*
	This view is called in reviewQuestion method of index.js view and is used to display well
	of question form with populated question information.
*/

define(['text!templates/reviewQuestionIndexLeftPane.html','models/reviewQuestionCollection'], 
	function(indexTemplate,QuestionCollection) {
	    var ReviewQuestionIndexLeftPane = Backbone.View.extend({

		    render: function() {
		    	//console.log(this.model.toJSON());
		    	this.$el.html(_.template(indexTemplate,this.model.toJSON()));
		    		return this;     
			    }	
			});

	return ReviewQuestionIndexLeftPane;
});

