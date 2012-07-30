define(['views/app', 'jquery'], function(AppView, $) {
	module('App Tests', {
		setup:function(){
			this.appView = new AppView();
			
		},
		teardown: function(){
			$(this.appView.el).removeData().unbind();
		}
	});
	test('An AppView is created with an empty collection', function() {
		expect(2)
		notEqual(undefined, this.appView.photoCollection, 'An App View is created with a collection');
		equal(0, this.appView.photoCollection.length, 'The collection is empty');
	});
	test('When clicking on the div the input is clicked', function(){
		expect(1);
		var clickCallback=sinon.spy();
		$('#upload_file').bind('click',clickCallback);
		$('#drop_area').click();
		ok(clickCallback.calledOnce, 'Click event was launched');
	});
});