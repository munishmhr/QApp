define(['text!templates/indexRightPane.html','models/question'], 
	function(indexTemplate,question) {
	
	    var indexRightPane = Backbone.View.extend({

	    render: function() {
	    	 var quest = new question({subtechnology : this.options.subtechnology});
	         quest.fetch();
	         console.log(quest);
	         this.$el.html(_.template(indexTemplate,quest.toJSON()));
	         return this;     
	      }	 
		});

return indexRightPane;
});
