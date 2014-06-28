define(['text!templates/enterQuestionIndexLeftPane.html','models/reviewQuestionCollection',
	'views/SubTechReviewIndexLeftPane'], 
	function(indexTemplate,QuestionCollection,MultiSelectSubTechnology) {
	
	    var enterQuestionIndexLeftPane = Backbone.View.extend({

	    render: function() {
		      this.$el.html(_.template(indexTemplate));

		      var quesCollection = new QuestionCollection();
		      var that = this;
		      $('#subTechnology').empty();
				
		      quesCollection.fetch({
		          success : function(){
				    quesCollection.each(function(quest){
						var multiSelectSubTechnology = (new MultiSelectSubTechnology({model : quest})).render().el;
						//console.log(multiSelectSubTechnology);
						$(multiSelectSubTechnology).appendTo('#multiselect.subTechnology');	
			        });
				   },
				   error : function(){
		            	console.log("bund mara lo");
		          	}
		      });
		 return this;     
		}	  

     });

return enterQuestionIndexLeftPane;
});

