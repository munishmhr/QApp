/*
 * To Read more about Backbone.Router refer url http://backbonejs.org/#Router
 *  This is backbone route whenever e.g index (right) is asked in addess index (left)
 * will be invoked. e.g in index method new Index view is invoked with passing a collection
 * to constructor of view.
 */
define([
		'views/index',
		'models/techCollection'
	],

	function (Index, TechCollection) {
		var QAppRouter = Backbone.Router.extend({
			currentView: null,

			routes: {
				"index": "indexFunction",
				"testIndex": "testFunction",
			},

			changeView: function (view) {
				console.log("router.js::changeView::");
				if (null != this.currentView) {
					this.currentView.undelegateEvents();
				}

				this.currentView = view;
				this.currentView.render();
			},

			indexFunction: function () {
				console.log("router.js::indexFunction");
				var techCollection = new TechCollection();
				var that = this;
				techCollection.fetch({
					success: function () {
						console.log("router.js::indexFunction::success::");
						that.changeView(new Index({
							collection: techCollection
						}));
					},
					error: function () {
						console.log("router.js::indexFunction::error::");
					}
				});
			},

			testFunction: function () {
				console.log("router.js::testFunction");
			}
		});
		return new QAppRouter();
	});