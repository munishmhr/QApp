define(['text!templates/index.html','models/tech','views/IndexLeftPane','views/IndexRightPane'
	,'views/EnterQuestionIndexLeftPane','views/ReviewQuestionIndexLeftPane','models/question'
	,'models/reviewQuestionCollection'], 

	function(indexTemplate,techList,indexLeftPane,indexRightPane,enterQuestion,reveiwQuestion,question,
		QuestionCollection) {
	var Index = Backbone.View.extend({
		el: $('#content'),

		events:{
			"click li" 					: "showquestion",
			"click #enterquestionId" 	: "enterQuestion",
			"submit form" 				: "updatequestion",
			"click #reviewquestionId" 	: "reviewQuestion"
		},
		
		initialize : function(){
			this.render;
		},

		render : function(){
			this.$el.html(indexTemplate);
			this.collection.each(function(technology){
				//var techlist = new techList(technology);
				var indexLeftHtml = (new indexLeftPane({model : technology})).render().el;
				$(indexLeftHtml).appendTo('#side-left-pane-technology-paneId');		
			})
		},	

		showquestion : function(events){
			//var indexRight = (new indexRightPane({subtechnology :$(events.target).html()})).render().el;
		},

		enterQuestion : function(){
			console.log('neter enterQuestion');
			var enterQ = (new enterQuestion()).render().el;
			$('#side-right-pane-question-spaceId').empty();
			$(enterQ).appendTo('#side-right-pane-question-spaceId');
		},

		updatequestion : function(event){
			event.preventDefault();
			var question = $('textarea[name=question]').val();
			var answer = $('textarea[name=answer]').val();
			var difficultylevel = $('input[name=difficultylevel]').val();
			var conceptscore = $('input[name=conceptscore]').val();
			var importancescore = $('input[name=importancescore]').val();
			var that = this;
			$.ajax({
					url: '/questionSubmit',
					type: 'POST',
					data: {
						question : question,
						answer    :answer,
						difficultylevel : difficultylevel,
						conceptscore : conceptscore,
						importancescore : importancescore
					}}).done(function onSuccess() {
						console.log("done");
						that.reviewQuestion();
						
					}).fail(function onError() {
						console.log("fuck");
			});				
		},

		reviewQuestion : function(event){

			if(event){
				event.preventDefault();
			}

			
			var quesCollection = new QuestionCollection();
		      var that = this;
		      $('#side-right-pane-question-spaceId').empty();
				
		      quesCollection.fetch({
		          success : function(){
				    quesCollection.each(function(quest){
						var reviewLeftHtml = (new reveiwQuestion({model : quest})).render().el;
						$(reviewLeftHtml).appendTo('#side-right-pane-question-spaceId');	
			        });
				   },
				   error : function(){
		            	console.log("bund mara lo");
		          	}
		      });
		}
	});

return Index;
});
