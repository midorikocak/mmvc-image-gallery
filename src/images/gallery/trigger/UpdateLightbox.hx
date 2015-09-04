package images.gallery.trigger;

import msignal.Signal;

import images.gallery.model.Image;


class UpdateLightbox
{
    public var data:Image;

    public function new(data:Image)
    {
        this.data = data;
        trace('I have data');
    }
}
