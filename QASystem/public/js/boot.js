require.config({
	paths: {
		jQuery: '/js/libs/jquery',
		Underscore: '/js/libs/underscore',
		Backbone: '/js/libs/backbone',
		text: '/js/libs/text',
		templates: '../templates'
	},

	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'QApp': ['Backbone']
	}
});

require(['QApp'], function(QApp) {
	console.log("boot.js::require QApp");
	QApp.initialize();
});
