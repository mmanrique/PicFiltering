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
		backbone: 'libs/backbone/backbone-lib'
	}
});
/*
Require es una funcion que toma, un array y un callback que se va a ejecutar luego
The names of each of the values in the first arrays are the names of the js files to import
*/
define(['views/app'], function(App){
	var aplicacion=new App();
});