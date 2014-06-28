define(['models/reviewQuestion'], function(reviewquestion) {
  var TechCollection = Backbone.Collection.extend({
    model: reviewquestion,
    url : '/reviewquestions/',
  });
  return TechCollection;
});