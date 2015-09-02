package images.app;

import images.gallery.model.Image;
import images.gallery.model.Lightbox;
class ApplicationViewMediator extends mmvc.impl.Mediator<ApplicationView>
{
    @inject public var lightbox:Lightbox;

    public function new()
    {
        super();
    }

    override function onRegister()
    {
        super.onRegister();
        view.createLightbox();
        view.createGallery();

        lightbox.dataChanged.add(updateLightbox);
    }

    public function updateLightbox(){
        view.updateLightbox(lightbox.data);
    }

    override public function onRemove():Void
    {
        super.onRemove();
    }
}
