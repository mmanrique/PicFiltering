define([
	'backbone',
	'underscore',
	'jquery',
	'pubsub',
	'text!templates/photo.html'
	],function(Backbone,_,$, PubSub,photoTemplate){
	var PhotoView=Backbone.View.extend({
		tagName: 'li',
		template: _.template(photoTemplate),
		events:{
			"click #close": "removeView",
			"click img": "imageClick"
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
		},
		imageClick:function(){
			PubSub.trigger("click:imageView",this.model.get('source'))
			
		}
	});
	return PhotoView;
});