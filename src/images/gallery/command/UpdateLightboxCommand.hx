package images.gallery.command;

import images.gallery.model.Lightbox;
import images.gallery.trigger.UpdateLightbox;
import images.gallery.model.Image;

/*
 * The command controls the signals and triggers
 */
class UpdateLightboxCommand extends mmvc.impl.TriggerCommand<UpdateLightbox>
{
    @inject public var lightbox:Lightbox;

    public function new()
    {
        trace('update lightbox command created');
        super();
    }

    override public function execute():Void
    {
     trace('update lightbox command executed');
        lightbox.data = trigger.data;
    }

    public function onUpdate(data:Image){
        trace('on update');
    }
}
