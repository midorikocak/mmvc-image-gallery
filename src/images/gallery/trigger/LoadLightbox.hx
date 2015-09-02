package images.gallery.trigger;

import msignal.Signal;

import images.gallery.model.Lightbox;


class LoadLightbox
{
    public var completed:Signal1<Lightbox>;
    public var failed:Signal1<Dynamic>;

    public function new()
    {
        completed = new Signal1<Lightbox>(Lightbox);
        failed = new Signal1<Dynamic>(Dynamic);
    }
}
