define(['backbone', 'underscore'],function(Backbone,_){
	var Photo=Backbone.Model.extend({
		defaults:{
			source:'',
			name:''
		},
		initialize:function(){

		}
	});
	return Photo;
});