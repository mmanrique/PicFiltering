define(['views/photo', 'model/photo', 'jquery'], function(PhotoView, PhotoModel, $){
	module('Photo views Test');
	test("Has some content when created",function(){
		expect(1);
		var photoView=new PhotoView();
		equal('li',photoView.el.tagName.toLowerCase(), 'It has a DOM element');
	});
	test('There is a model attached to the view',function(){
		var photoView=new PhotoView({model:new PhotoModel()});
		notEqual( photoView.model, undefined, 'model was added to the view');
	});
	test('can render the correct content',function(){
		expect(3)
		var photoView=new PhotoView({model:new PhotoModel({source:'Manuel'})});
		$('#images_list').append(photoView.render().el);
		equal(1, $('#images_list li').size(), 'List element was appended');
		equal(1, $('#images_list li img').size(), 'Image is inside list element');
		equal('Manuel', $('#images_list li img').attr('src'), 'Source is set correctly');
	})
})