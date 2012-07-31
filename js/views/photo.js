define([
	'backbone',
	'underscore',
	'jquery',
	'text!templates/photo.html'
	],function(Backbone,_,$, photoTemplate){
	var PhotoView=Backbone.View.extend({
		tagName: 'li',
		template: _.template(photoTemplate),
		events:{
			"click #close": "removeView"
		},
		render:function(){
			var $el=$(this.el);
			$el.html(this.template({
				source:this.model.get('source')
			}));
			return this;
		},
		removeView:function(){
			this.remove();
		},
		initialize:function(){
			_.bindAll(this,'removeView', 'render');
		}
	});
	return PhotoView;
});