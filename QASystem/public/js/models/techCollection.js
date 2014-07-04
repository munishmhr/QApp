/*
	Collection for getting data from node @ address /index.
*/
define(['models/techModel'], function(techModel) {
  var TechCollection = Backbone.Collection.extend({
    model: techModel,
    url : '/index/',
  });
  return TechCollection;
});