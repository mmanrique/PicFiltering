define(['collection/photoCollection', 'model/photo'], function(PhotoCollection, PhotoModel) {
	module('PhotoCollection tests')
	test('New Items can be added', function() {
		expect(2);
		var collection = new PhotoCollection();
		var photo = new PhotoModel();
		collection.add({
			source: 'why care'
		});
		equal(1, collection.length, 'An Element can be added to the Collection');
		collection.add([{
			souce: 'Manuel'
		}, {
			source: 'People'
		}]);
		equal(3, collection.length, 'Arrays can be added to the collection');
	});
	test('Events are triggered when the model changes', function() {
		expect(2);
		var collection = new PhotoCollection();
		var addModelCallback = sinon.spy();
		var removeModelCallback = sinon.spy();
		collection.bind("add", addModelCallback);
		collection.bind("remove", removeModelCallback);
		collection.add({
			souce: 'Manuel'
		});
		ok(addModelCallback.called, 'Add Callback was called');
		collection.remove(collection.last());
		ok(removeModelCallback.called, 'Remove Callback was called');
	});

});