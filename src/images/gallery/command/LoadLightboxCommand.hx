package images.gallery.command;

import images.gallery.trigger.LoadLightbox;
import images.gallery.model.Lightbox;
import images.gallery.model.Image;

class LoadLightboxCommand extends mmvc.impl.TriggerCommand<LoadLightbox>
{
    @inject
    public var lightbox:Lightbox;

    public function new()
    {
        super();
    }

    override public function execute():Void
    {
        trace("hey it's me lightbox! I am here, change my data.");
        trigger.completed.dispatch(lightbox);
    }
}
