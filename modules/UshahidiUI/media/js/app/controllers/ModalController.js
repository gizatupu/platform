define(['App', 'backbone', 'marionette',
	'views/modals/CreatePostView', 'views/modals/EditPostView', 'views/modals/AddToSetView',
	'models/PostModel'],
	function(App, Backbone, Marionette,
		PostCreateView, PostEditView, AddToSetView,
		PostModel)
	{
		return Backbone.Marionette.Controller.extend(
		{
			initialize : function(options)
			{
				// Store modal region we're controlling
				this.modal = options.modal;

				App.vent.on('post:create', this.postCreate, this);
				App.vent.on('post:edit', this.postEdit, this);
				App.vent.on('post:set', this.addToSet, this);
			},
			postCreate : function ()
			{
				var that = this,
					post;

				post = new PostModel({
					// @todo stop hard coding form-id
					form : {
						id : 1
					}
				});

				// @todo ensure tagscollection is loaded

				post.relationsCallback.done( function () {
					that.modal.show(new PostCreateView({
						model: post
					}));
					that.modal.currentView.on('close', that.modal.close, that.modal);
				});
				post.fetchRelations();
			},
			postEdit : function (post)
			{
				this.modal.show(new PostEditView({
					model : post
				}));
				this.modal.currentView.on('close', this.modal.close, this.modal);
			},
			addToSet : function (post)
			{
				this.modal.show(new AddToSetView({
					model : post
				}));
				this.modal.currentView.on('close', this.modal.close, this.modal);
			}
		});
	});
