package images.app;

import images.gallery.view.GalleryView;
import images.gallery.model.Gallery;
import images.core.View;

class ApplicationView extends View implements mmvc.api.IViewContainer
{
    public var viewAdded:Dynamic -> Void;
    public var viewRemoved:Dynamic -> Void;

    public function new()
    {
        super();
    }

    public function createGallery()
    {
        var galleryView:GalleryView = new images.gallery.view.GalleryView();
        addChild(galleryView);
    }

    public function createLightbox()
    {
        var lightboxView = new images.gallery.view.LightboxView();
        addChild(lightboxView);
    }

    public function updateLightbox(){
        trace('update but where?');
    }

    override public function dispatch(event:String, view:View)
    {
        switch(event)
        {
            case View.ADDED:
                {
                    viewAdded(view);
                }
            case View.REMOVED:
                {
                    viewRemoved(view);
                }
            default:
                {
                    super.dispatch(event, view);
                }
        }
    }

    public function isAdded(view:Dynamic):Bool
    {
        return true;
    }

    override function initialize()
    {
        super.initialize();
        js.Browser.document.body.appendChild(element);
    }
}
