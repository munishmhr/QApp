/*
	This is main page which is displayed when / address is requested
*/
define(['text!templates/index.html','views/indexLeftPane'
	,'views/enterQuestionIndexLeftPane','views/reviewQuestionIndexLeftPane'
	,'models/reviewQuestionCollection'], 

	function(indexTemplate,indexLeftPane,enterQuestion,reveiwQuestion,
		QuestionCollection) {
		var Index = Backbone.View.extend({
			el: $('#content'),

			events:{
				"click #subtechList" 		: "showquestion",
				"click #enterquestionId" 	: "enterQuestion",
				"submit form" 				: "updatequestion",
				"click #reviewquestionId" 	: "reviewQuestion"
			},
			
			initialize : function(){
				this.render;
			},
			/*
				Will load indexTemplate elements.
				indexTemplate has 2 divs left and right.
				This includes 2 views one is accordian and second with Enter and review question.
				Both of these views will be displayed in left div.
			*/
			render : function(){
				this.$el.html(indexTemplate);
				//console.log(this.collection);
				this.collection.each(function(technology){
					var indexLeftHtml = (new indexLeftPane({model : technology})).render().el;
					$(indexLeftHtml).appendTo('#side-left-pane-technology-paneId');		
				})
			},	
			/*
				This is called when click event on one of the subtechnologies on left hand div
				is clicked. 
			*/
			showquestion : function(events){
				$('#side-right-pane-question-spaceId').empty();
				var quesCollection = new QuestionCollection({subtechnology : $(events.target).html()});
			    var that = this;
			    $('#side-right-pane-question-spaceId').empty();
			    quesCollection.fetch({

			        success : function(){
			       	//console.log(quesCollection);
					    quesCollection.each(function(quest){
							var reviewLeftHtml = (new reveiwQuestion({model : quest})).render().el;
							$(reviewLeftHtml).appendTo('#side-right-pane-question-spaceId');	
				        });
					},

					error : function(){
			        //	console.log("lo");
			        }

			    });
			},

			/*
				This method will show view form on right side and on submit will call 
				updatequestion.
			*/
			enterQuestion : function(){
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
				//var multiSelect = $('multiple[name==multiSelect]').val();
				var multiSelect = $.map( $('#multiSelect option:selected'),
	            	function(e) { 
	            		return $(e).val(); 
	            });

				/*
					post request to /questionsubmit which will directly talk to node app.js
				*/
				var that = this;
				$.ajax({
						url: '/questionsubmit',
						type: 'POST',
						data: {
							subtechnology 	: multiSelect,
							question 		: question,
							answer    		: answer,
							difficultylevel : difficultylevel,
							conceptscore 	: conceptscore,
							importancescore : importancescore
						}}).done(function onSuccess() {
							//console.log("done");
							that.reviewQuestion();
							
						}).fail(function onError() {
							console.log("fuck");
				});				
			},
			/*
				Will make query when review question is clicked and fetch all question from 
				questionbank table and display on right div.
			*/

			reviewQuestion : function(event){
				if(event){
					event.preventDefault();
				}
				var quesCollection = new QuestionCollection();
			    var that = this;
			    $('#side-right-pane-question-spaceId').empty();
			    quesCollection.fetch({

			        success : function(){
			          	//console.log(quesCollection);
					    quesCollection.each(function(quest){
							var reviewLeftHtml = (new reveiwQuestion({model : quest})).render().el;
							$(reviewLeftHtml).appendTo('#side-right-pane-question-spaceId');	
				        });
				    },

				    error : function(){
			           	console.log("lo");
			       	}

			    });
			}
		});

	return Index;
});
