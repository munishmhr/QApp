define(['models/tech'], function(tech) {
  var TechCollection = Backbone.Collection.extend({
    model: tech,
    url : '/index/',
  });
  return TechCollection;
});