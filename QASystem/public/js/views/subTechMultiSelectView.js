/*
	This view is called in enterQuestionIndexLeftPane.js view and is used to display multiselect 
	subtechnology in enterQuestionIndexLeftPane.js view.
*/
define(['text!templates/subTechMultiSelect.html'],function(indexTemplate) {
	    var SubTechMultiSelect = Backbone.View.extend({

		    render: function() {
			    this.$el.html(_.template(indexTemplate,this.model.toJSON()));
			 return this;     
			}	  
        });
	return SubTechMultiSelect;
});

