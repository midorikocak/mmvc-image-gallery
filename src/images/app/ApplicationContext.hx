package images.app;

import images.gallery.view.LightboxViewMediator;
import images.gallery.trigger.LoadLightbox;
import images.gallery.command.LoadLightboxCommand;
import images.gallery.view.LightboxView;
import images.gallery.model.Lightbox;
import mmvc.api.IViewContainer;

import images.app.ApplicationView;
import images.app.ApplicationViewMediator;

import images.gallery.trigger.LoadGallery;
import images.gallery.command.LoadGalleryCommand;
import images.gallery.model.Gallery;
import images.gallery.view.GalleryView;
import images.gallery.view.GalleryViewMediator;


class ApplicationContext extends mmvc.impl.Context {

    public function new(?contextView:IViewContainer = null) {
        super(contextView);
    }

    override public function startup() {
        triggerMap.map(LoadGallery, LoadGalleryCommand);
        triggerMap.map(LoadLightbox, LoadLightboxCommand);

        injector.mapSingleton(Gallery);
        injector.mapSingleton(Lightbox);
        mediatorMap.mapView(LightboxView, LightboxViewMediator);
        mediatorMap.mapView(GalleryView, GalleryViewMediator);
        mediatorMap.mapView(ApplicationView, ApplicationViewMediator);
    }

    override public function shutdown() {

    }
}
