define(['backbone', 'jquery'],function(BackBone, $){
	var AppView=BackBone.View.extend({
		el: $('body'),
		initialize:function(){
			this.inputField=$('#upload_file');
			this.inputDiv=$('#drop_area');
			//Here we can add listener for our Models or collection
		},
		events:{
			'click #drop_area': 'openFileLoader',
			'change #upload_file': 'uploadImage'
		},
		openFileLoader: function(){
			this.inputField.click();
		},
		uploadImage: function(){
			console.log('upload a file then');
		}

	});
	return AppView;
});