package images.gallery.trigger;

import msignal.Signal;

import images.gallery.model.Gallery;

/**
Application signal for loading an existing external Gallery.

Includes sub signals for completed/failed handlers once list is loaded.

@see images.gallery.command.LoadGalleryCommand
@see msignal.Signal

*/
class LoadGallery
{
/**
	dispatched once TodoList has been loaded
	*/
    public var completed:Signal1<Gallery>;

/**
	Dispatched if application unable to load TodoList
	*/
    public var failed:Signal1<Dynamic>;

    public function new()
    {
        completed = new Signal1<Gallery>(Gallery);
        failed = new Signal1<Dynamic>(Dynamic);
    }
}
