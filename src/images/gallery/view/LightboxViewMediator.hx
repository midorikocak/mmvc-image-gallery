package images.gallery.view;

import images.gallery.model.Image;
import images.gallery.model.Lightbox;
import images.gallery.view.LightboxView;
import images.gallery.trigger.LoadLightbox;

class LightboxViewMediator extends mmvc.impl.TriggerMediator<LightboxView>
{
    @inject public var lightbox:Lightbox;

    public function new()
    {
        super();
    }

    override function onRegister()
    {
        var trigger = new LoadLightbox();
        trigger.completed.addOnce(loadCompleted);
        dispatch(trigger);
    }

    override public function onRemove():Void
    {
        super.onRemove();
    }

    function loadCompleted(lightbox:Lightbox)
    {
        trace('load completed?');
        view.data = lightbox.data;
    }

}
