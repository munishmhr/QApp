/*
	This view is called in enterQuestion method if index.js and has 2 view embedded in it one has form 
	and other has multiselect subtechnology(SubtechMultiSelectView.js).
*/
define(['text!templates/enterQuestionIndexLeftPane.html','models/subTechnologiesCollection',
	'views/subTechMultiSelectView'], 
	function(indexTemplate,SubtechnologiesCollection,SubtechMultiSelectView) {
	
	    var EnterQuestionIndexLeftPane = Backbone.View.extend({

		    render: function() {
		    	  this.$el.html(_.template(indexTemplate));
			      var subtechnologiesCollection = new SubtechnologiesCollection();
			      subtechnologiesCollection.fetch({
			      	
			      	success : function(){
			      		//console.log(subtechnologiesCollection);
			      		subtechnologiesCollection.each(function(subtech){
			      			var subtechMultiSelectView = new SubtechMultiSelectView({model : subtech}).render().el;
			      			$(subtechMultiSelectView).appendTo('#multiselect');
			      		});
			      	},

			      	error : function(){
			      		console.log("Error Inside enterQuestionIndexLeftPane ");
			      	}
			      
			      })
			 return this;     
			}	  
     });

return EnterQuestionIndexLeftPane;
});

