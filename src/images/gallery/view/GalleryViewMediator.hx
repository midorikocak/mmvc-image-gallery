package images.gallery.view;

import images.gallery.model.Gallery;
import images.gallery.model.Image;
import images.gallery.model.Lightbox;
import images.gallery.view.GalleryView;
import images.gallery.trigger.LoadGallery;

class GalleryViewMediator extends mmvc.impl.TriggerMediator<GalleryView>
{
    @inject public var lightbox:Lightbox;

    public function new()
    {
        super();
    }

    override function onRegister()
    {
        var trigger = new LoadGallery();
        trigger.completed.addOnce(loadCompleted);
        dispatch(trigger);
        view.itemSelected.add(onItemSelected);
    }

    function onItemSelected(data:Image)
    {
        trace('clicked');
        lightbox.data = data;
    }

    override public function onRemove():Void
    {
        super.onRemove();

    }

    function loadCompleted(list:Gallery)
    {
        view.data = list;
    }

/*
    function loadFailed(error:Dynamic)
    {
        view.showError(Std.string(error));
    }
    */

}
