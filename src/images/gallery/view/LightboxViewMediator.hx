package images.gallery.view;
import images.gallery.model.Lightbox;
import images.gallery.trigger.UpdateLightbox;
import images.gallery.model.Image;
import images.gallery.view.LightboxView;

/*
 * A mediator is like a helper to handle view variables and keep the view logic out of views.
 * Single responsibility darling!
 */
class LightboxViewMediator extends mmvc.impl.TriggerMediator<LightboxView>
{
    @inject public var lightbox:Lightbox;

    public function new()
    {
        super();
    }

    override function onRegister()
    {
        trace('lightbox registered');
        lightbox.dataChanged.add(onUpdate);
        view.updateData(lightbox.data);
        view.closeLightbox.add(onClose);
    }

    override public function onRemove():Void
    {
        super.onRemove();
    }

    function onClose(){
        //lightbox.data = null;
        dispatch(new UpdateLightbox(null));
    }

    function onUpdate()
    {
        trace('on update runs');
        view.updateData(lightbox.data);
    }

}
