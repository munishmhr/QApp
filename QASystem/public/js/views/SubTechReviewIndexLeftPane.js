define(['text!templates/subTechReviewIndexLeftPane.html'], 
	function(indexTemplate,TechCollection) {
	
	    var subTechReviewIndexLeftPane = Backbone.View.extend({

	    render: function() {
		      this.$el.html(_.template(indexTemplate,this.model.toJSON()));
		 return this;     
		}	  

     });

return subTechReviewIndexLeftPane;
});

