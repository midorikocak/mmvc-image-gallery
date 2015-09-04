package images.app;
class ApplicationViewMediator extends mmvc.impl.Mediator<ApplicationView>
{

    public function new()
    {
        super();
    }

    override function onRegister()
    {
        trace('app view registered');
        super.onRegister();
        view.createLightbox();
        view.createGallery();
    }

    override public function onRemove():Void
    {
        super.onRemove();
    }
}
