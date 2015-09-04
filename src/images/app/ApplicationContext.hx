package images.app;

import images.gallery.model.Lightbox;
import images.gallery.command.UpdateLightboxCommand;
import images.gallery.trigger.UpdateLightbox;
import images.gallery.view.LightboxViewMediator;
import images.gallery.view.LightboxView;
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
        triggerMap.map(UpdateLightbox, UpdateLightboxCommand);

        injector.mapSingleton(Gallery);
        injector.mapSingleton(Lightbox);

        mediatorMap.mapView(LightboxView, LightboxViewMediator);
        mediatorMap.mapView(GalleryView, GalleryViewMediator);
        mediatorMap.mapView(ApplicationView, ApplicationViewMediator);
    }

    override public function shutdown() {

    }
}
