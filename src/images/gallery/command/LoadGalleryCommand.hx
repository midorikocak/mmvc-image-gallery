/*
Copyright (c) 2012 Massive Interactive

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

package images.gallery.command;

import images.gallery.signal.LoadGallery;
import images.gallery.model.Gallery;
import images.gallery.model.Image;

import mcore.loader.Loader;
import mcore.loader.JSONLoader;

/**
Loads an existing gallery from the file system,

Dispatches LoadGallery.completed or failed signal based on result of loader.

@see example.galllery.signal.LoadLoadGallery
@see m.loader.JSONLoader
*/
class LoadGalleryCommand extends mmvc.impl.Command
{
    @inject
    public var list:Gallery;

    @inject
    public var loadGallery:LoadGallery;

    var loader:JSONLoader;

    public function new()
    {
        super();
    }

/**
	loads a json file
	*/
    override public function execute():Void
    {
        loader = new JSONLoader("data/data.json");
        loader.completed.addOnce(completed);
        loader.failed.addOnce(failed);
        loader.load();
    }

/**
	Converts the raw json object into Images
	Dispatches completed signal on completion.

	@param data 	raw json object
	*/
    function completed(data:Dynamic)
    {
        loader.failed.remove(failed);

        var items:Array<Dynamic> = cast data.items;

        for(item in items)
        {
            var image = new Image(item.title,item.description, item.author, item.src);
            //todo.done = item.done == true;
            list.add(image);
        }

        loadGallery.completed.dispatch(list);
    }

/**
	Dispatches failed signal if JSONLoader is unsuccessful
	*/
    function failed(error:LoaderError)
    {
        loader.completed.remove(completed);

        loadGallery.failed.dispatch(Std.string(error));
    }
}
