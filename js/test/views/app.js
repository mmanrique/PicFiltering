define(['views/app', 'jquery'], function(AppView, $) {
	module('App Tests', {
		setup: function() {
			this.appView = new AppView();

		},
		teardown: function() {
			$(this.appView).removeData().unbind();
		}
	});
	test('An AppView is created with an empty collection', function() {
		expect(2)
		notEqual(undefined, this.appView.photoCollection, 'An App View is created with a collection');
		equal(0, this.appView.photoCollection.length, 'The collection is empty');
	});
	test('When clicking on the div the input is clicked', function() {
		expect(1);
		var clickCallback = sinon.spy();
		$('#upload_file').bind('click', clickCallback);
		$('#drop_area').click();
		ok(clickCallback.calledOnce, 'Click event was launched');
	});
	test('The input file is cleared after change', function() {
		expect(2);
		var changeCallback = sinon.spy(AppView.prototype, 'uploadImageInput');
		//Re-create the appView
		this.appView=new AppView();
		$("#upload_file").val('Memorex');
		$("#upload_file").trigger('change');
		ok(this.appView.uploadImageInput.calledOnce, 'The event was called');
		AppView.prototype.uploadImageInput.restore();
		equal('',$("#upload_file").val(),'The Input is cleard after the event is launched');
	});
});