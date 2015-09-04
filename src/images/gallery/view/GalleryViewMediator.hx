package images.gallery.view;

import js.Browser;
import js.html.Element;
import images.gallery.trigger.UpdateLightbox;
import images.gallery.model.Gallery;
import images.gallery.model.Image;
import images.gallery.view.GalleryView;
import images.gallery.trigger.LoadGallery;

/*
 * A mediator can interact with models and commands.
 */

class GalleryViewMediator extends mmvc.impl.TriggerMediator<GalleryView>
{
    public function new()
    {
        super();
    }

    override function onRegister()
    {
        // Load gallery comand is called from the view register event
        var trigger = new LoadGallery();
        // the trigger completed signal added to loadCompleted method
        trigger.completed.addOnce(loadCompleted);
        // view itemselected signal catched and added to the method
        view.itemSelected.add(onItemSelected);
        dispatch(trigger);
    }

    function onItemSelected(data:Image)
    {
        dispatch(new UpdateLightbox(data));
        trace('update lightbox data command dispatched');
        trace('item selected');
    }

    override public function onRemove():Void
    {
        super.onRemove();

    }

    function loadCompleted(list:Gallery)
    {
        // view's data property changed here.
        view.data = list;
    }

/*
    function loadFailed(error:Dynamic)
    {
        view.showError(Std.string(error));
    }
    */

}
