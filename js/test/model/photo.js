define(['backbone', 'model/photo'], function(Backbone, PhotoModel) {
	module('Photo Model Tests');
	/*
	Some Data is set when initializing
	*/
	test('Created with default values', function() {
		expect(1);
		var photoModel = new PhotoModel();
		equal('', photoModel.get('source'), 'Source is not being initialized');
	});
	/*
	Attributes can be set during the execution
	*/
	test('Attributes can be set', function() {
		expect(1);
		var photoModel = new PhotoModel({source: 'localtest'});
		equal('localtest', photoModel.get('source'), 'source not correct');
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