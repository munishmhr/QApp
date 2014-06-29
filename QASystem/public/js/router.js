define([
	'views/index',
	'models/techCollection'
	],
       
	function(Index,TechCollection) {
		var QAppRouter = Backbone.Router.extend({
			currentView: null,
			routes: {
				"index": "index",
			},

			changeView: function(view) {
				if ( null != this.currentView ) {
					this.currentView.undelegateEvents();
				}
				this.currentView = view;
				this.currentView.render();
			},

			index : function() {
				var techCollection = new TechCollection();
				console.log('router.js::index');
				techCollection.fetch({
					success : function() {
						console.log('router.js::index::success');
						that.changeView(new Index( {collection : techCollection} ));
					},
					error : function() {
						console.log("router.js::index::error");
					}
				});
			},
		});
		return new QAppRouter();
	}
);
