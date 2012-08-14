define(['backbone', 'jquery', 'underscore', 'views/photo', 'collection/photoCollection', 'pubsub'], function(BackBone, $, _, PhotoView, PhotoCollection, PubSub) {
	var AppView = BackBone.View.extend({
		el: $('body'),
		initialize: function() {
			//This runs after it's rendered
			this.$inputField = $('#upload_file');
			this.$inputDiv = $('#drop_area');
			this.$imageList = $('#images_list');
			this.$controls = $('#controls');
			_.bindAll(this, 'addPhotoCollection');
			this.photoCollection = new PhotoCollection();
			this.photoCollection.on('add', this.addPhotoView, this);
			PubSub.on('click:imageView', this.displayImage, this);
			//
			//Here we can add listener for our Models or collection
		},
		events: {
			'click #drop_area': 'openFileLoader',
			'change #upload_file': 'uploadImageInput',
			'drop #drop_area': 'uploadImageDroped',
			'change #saturateControl': 'changeSaturate',
			'change #hueControl': 'changeHue',
			'change #redControl': 'changeRed',
			'change #greenControl': 'changeGreen',
			'change #blueControl': 'changeBlue',
			'click #export': 'exportImage'
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
		displayImage: function(imageContent) {
			//TODO:Reset all the filter values
			$('#image_dude').attr('xlink:href', imageContent);
			//display the controls.
			this.$controls.addClass('visible');
		},
		changeSaturate: function(e) {
			$('#colorSaturate')[0].values.baseVal.getItem(0).value = e.target.value / 100;
		},
		changeHue: function(e) {
			$('#colorHue')[0].values.baseVal.getItem(0).value = e.target.value;
		},
		changeRed: function(e) {
			$('#colorRed').attr('slope', e.target.value / 50);
		},
		changeGreen: function(e) {
			$('#colorGreen').attr('slope', e.target.value / 50);
		},
		changeBlue: function(e) {
			$('#colorBlue').attr('slope', e.target.value / 50);
		},
		exportImage: function() {
			var imageDataUrl = $('#image_dude').attr('xlink:href');
			var colorRed = $('#colorRed').attr('slope')
			var colorGreen = $('#colorGreen').attr('slope');
			var colorBlue = $('#colorBlue').attr('slope');
			var canvas = document.createElement('canvas');
			var imageElement = document.createElement('img')
			imageElement.src = imageDataUrl;
			canvas.width = imageElement.width;
			canvas.height = imageElement.height;
			var context = canvas.getContext("2d");
			var image = new Image();
			image.onload = function() {
				context.fillStyle = 'white';
				context.fillRect(0, 0, canvas.width, canvas.height);
				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				var worker = new Worker("/js/views/worker.js");
				worker.postMessage({
					imageData: imageData,
					colorRed: colorRed,
					colorBlue: colorBlue,
					colorGreen: colorGreen
				});
				worker.addEventListener('message', function(e) {
					context.putImageData(e.data, 0, 0);
					imageElement.src = canvas.toDataURL("image/png");
					var link = document.createElement('a');
					link.href = imageElement.src;
					link.download = 'exported.png';
					link.click();
				}, false);
			}
			image.src = imageDataUrl;
		}
	});
	return AppView;
});