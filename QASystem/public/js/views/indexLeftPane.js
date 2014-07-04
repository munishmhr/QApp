/*
	This view is called in render method of index.js view and is used to display accordian
	and populating data from model passed from same.
*/

define(['text!templates/indexLeftPane.html'], function(indexTemplate) {
	
    var IndexLeftPane = Backbone.View.extend({
	    render: function() {
	        this.$el.html(_.template(indexTemplate,this.model.toJSON()));
	        return this;     
	    }	  
	});
	
	return IndexLeftPane;
});
