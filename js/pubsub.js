define(['backbone', 'underscore'], function(Backbone, _) {
	//Define a Main Object to hold our Application Events. This object is global
	MyApp = {};
	_.extend(MyApp, Backbone.Events);
	return MyApp;
});