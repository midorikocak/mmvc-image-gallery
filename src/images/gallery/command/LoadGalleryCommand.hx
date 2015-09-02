package images.gallery.command;

import images.gallery.trigger.LoadGallery;
import images.gallery.model.Gallery;
import images.gallery.model.Image;

import mcore.loader.Loader;
import mcore.loader.JSONLoader;

class LoadGalleryCommand extends mmvc.impl.TriggerCommand<LoadGallery>
{
    @inject
    public var list:Gallery;

    var loader:JSONLoader;

    public function new()
    {
        super();
    }

    override public function execute():Void
    {
        trace('loaded');
        loader = new JSONLoader("data/data.json");
        loader.completed.addOnce(onCompleted);
        loader.failed.addOnce(failed);
        loader.load();
    }

    function onCompleted(data:Dynamic)
    {
        loader.failed.remove(failed);

        var items:Array<Dynamic> = cast data.items;

        for (item in items)
        {
            var image = new Image(item.title, item.description, item.author, item.src);
            list.add(image);
        }

        trigger.completed.dispatch(list);
    }

    function failed(error:LoaderError)
    {
        loader.completed.remove(onCompleted);

        trigger.failed.dispatch(Std.string(error));
    }
}
