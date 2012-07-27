define([
	'backbone',
	'model/photo'
	],function(Backbone, photoModel){
	var TodoCollection=Backbone.Collection.extend({
		model:photoModel
	});
	return TodoCollection;
})