define([
	'backbone', 
	'jquery', 
	'underscore', 
	'views/photo', 
	'collection/photoCollection',
	'pubsub'],
	function(BackBone, $, _, PhotoView, PhotoCollection, PubSub) {
	var AppView = BackBone.View.extend({
		el: $('body'),
		initialize: function() {
			this.$inputField = $('#upload_file');
			this.$inputDiv = $('#drop_area');
			this.$imageList = $('#images_list');
			this.$canvas=$('#image_canvas');
			_.bindAll(this, 'addPhotoCollection');
			this.photoCollection = new PhotoCollection();
			this.photoCollection.on('add', this.addPhotoView, this);
			PubSub.on('click:imageView', this.displayImage, this);
			//Here we can add listener for our Models or collection
		},
		events: {
			'click #drop_area': 'openFileLoader',
			'change #upload_file': 'uploadImageInput',
			'drop #drop_area': 'uploadImageDroped'
		},
		openFileLoader: function() {
			this.$inputField.click();
		},
		uploadImageInput: function(e) {
			//JQuery provides a way to get the target
			var fileList = e.target.files;
			this.createFile(fileList);
			this.$inputField.val('');
		},
		uploadImageDroped: function(e) {
			e.preventDefault();
			var fileList = e.originalEvent.dataTransfer.files;
			this.createFile(fileList);
		},
		createFile: function(fileList) {
			var reader;
			var photo;
			if (fileList != null && fileList.length != null) {
				for (var i = 0; i < fileList.length; i++) {
					reader = new FileReader(fileList[i]);
					reader.onload = this.addPhotoCollection;
					reader.readAsDataURL(fileList[i]);
				}
			}

		},
		addPhotoCollection: function(fileReaderEvent) {
			this.photoCollection.add({
				source: fileReaderEvent.target.result
			});

		},
		addPhotoView: function(photoModel) {
			var photo = new PhotoView({
				model: photoModel
			});
			this.$imageList.append(photo.render().el);
		},
		displayImage:function(imageContent){
			jQuery('#image_dude').attr('xlink:href',imageContent);
			var context=this.$canvas.get(0).getContext("2d");
			var image=new Image();
			image.onload=function(){
				context.drawImage(image,0,0,200,200);	
			}
			image.src=imageContent;
		}
	});
	return AppView;
});