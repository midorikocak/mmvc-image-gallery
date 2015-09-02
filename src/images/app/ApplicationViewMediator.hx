package images.app;

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
        view.createGallery();
        view.createLightbox();

        lightbox.dataChanged.add(updateLightbox);
    }

    public function updateLightbox(){
        view.updateLightbox();
    }

    override public function onRemove():Void
    {
        super.onRemove();
    }
}
