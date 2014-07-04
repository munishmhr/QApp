/*
	Collection for getting data from node @ address /subtechnologies.
*/

define(['models/subTechnologiesModel'],function(subtechnologies) {
  var subtechnologiesCollection = Backbone.Collection.extend({
  	model : subtechnologies,
  	url : '/subtechnologies'

  });
    return subtechnologiesCollection;
});
