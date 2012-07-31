define(['backbone', 'model/photo'], function(Backbone, PhotoModel) {
	module('Photo Model Tests');
	/*
	Some Data is set when initializing
	*/
	test('Created with default values', function() {
		expect(2);
		var photoModel = new PhotoModel();
		equal('', photoModel.get('source'), 'Source is being initialized');
		equal('', photoModel.get('name'), 'Name is being being initialized');
	});
	/*
	Attributes can be set during the execution
	*/
	test('Attributes can be set', function() {
		expect(2);
		var photoModel = new PhotoModel({source: 'localtest',name:'Manuel.jpg'});
		equal('localtest', photoModel.get('source'), 'source is set');
		equal('Manuel.jpg', photoModel.get('name'), 'Name is set')
	});
	/*
	Events are called with Sinon js
	*/
	test('Events are being called', function() {
		expect(1);
		var spy = sinon.spy();
		var photoModel = new PhotoModel();
		photoModel.bind("change", spy);
		photoModel.set({source: "new souce"});
		ok(spy.calledOnce, "A Change Event was called");
	});
});