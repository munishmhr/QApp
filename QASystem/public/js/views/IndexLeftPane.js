define(['text!templates/indexLeftPane.html'], function(indexTemplate) {
	
    var indexLeftPane = Backbone.View.extend({

    render: function() {
          this.$el.html(_.template(indexTemplate,this.model.toJSON()));
          return this;     
      }	  

	});

return indexLeftPane;
});
