require.config({
	shim: {
	    'underscore': {
	        exports: '_'
	    },

	    'backbone': {
	        deps: ['underscore', 'jquery'],
	        exports: 'Backbone'
	    },

	},
	paths: {
		jquery: 'libs/jquery/jquery-lib',
		underscore: 'libs/underscore/underscore-lib',
		backbone: 'libs/backbone/backbone-lib',
		text: 'libs/require/text'
	}
});
define([
	'test/model/photo',
	'test/collection/photoCollection',
	'test/views/photo'
	], function(photoModelTest, PhotoCollectionTest, photoView){

});