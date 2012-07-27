define(['backbone', 'underscore'],function(Backbone,_){
	var Photo=Backbone.Model.extend({
		defaults:{
			source:''
		},
		initialize:function(){

		}
	});
	return Photo;
});