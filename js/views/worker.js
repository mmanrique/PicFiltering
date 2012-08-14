self.addEventListener('message', function(originalEvent) {
	var colorRed=originalEvent.data.colorRed;
	var colorGreen=originalEvent.data.colorGreen;
	var colorBlue=originalEvent.data.colorBlue;
	var imageData=originalEvent.data.imageData;
	for (var x = 0; x < imageData.height; x++) {
		for (var y = 0; y < imageData.width; y++) {
			var index = (x * imageData.width * 4) + (y * 4);
			//var value=imageData.data[(y*canvas.width*4)+(x*4)]
			imageData.data[index + 0] = imageData.data[index + 0] * colorRed;
			imageData.data[index + 1] = imageData.data[index + 1] * colorGreen;
			imageData.data[index + 2] = imageData.data[index + 2] * colorBlue;
		}
	}
	self.postMessage(imageData);

}, false);