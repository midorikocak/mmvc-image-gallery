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

package images.gallery.view;

import images.core.View;
import images.core.DataView;
import images.gallery.model.Image;
import images.gallery.model.Gallery;

/**
//Main TodoList view containing a list of Todo items

//Updates individual todo item state when user clicks on a todo item

@see images.core.DataView
@see images.gallery.view.ImageView
@see images.gallery.model.Gallery
*/
class GalleryView extends DataView<Gallery>
{
    inline public static var SHOW_IMAGE = "SHOW_IMAGE";
    var infoView:ImageInfoView;

/**
	Overrides constructor to set js tag name to unordered list (ul)

	@param data 	default TodoList
	@see example.core.DataView
	*/
    public function new(?data:Gallery)
    {
        tagName = "ul";
        super(data);
    }

/**
	Displays an error in the stats view
	*/
    public function showError(message:String)
    {
        infoView.setData(message);
    }

/**
	Overrides dispatched to handle ACTIONED events from child views.

	@see example.core.DataView
	*/
    override public function dispatch(event:String, view:View)
    {
        switch(event)
        {
            case View.ACTIONED:
                {
                    if (Std.is(view, ImageView))
                    {
                        var imageView = cast view;
//toggleImageViewState(ImageView);
                    }
                    else if (Std.is(view, ImageInfoView))
                    {
                        super.dispatch(SHOW_IMAGE, this);
                    }
                }
            default:
                {
                    super.dispatch(event, view);
                }
        }
    }

/**
	Toggles the done state of a single TodoView

	@param view 	TodoView to toggle done state
	*/
    /*
    function toggleTodoViewState(view:ImageView)
    {
        var data = view.data;
        data.done = !data.done;
        view.setData(data, true);

        updateStats();

    }*/


/**
	Overrides initialized to create stats view
	@see example.core.View
	*/
    override function initialize()
    {
        super.initialize();

        infoView = new ImageInfoView();
        addChild(infoView);
    }


/**
	Overrides dataChanged to add/remove listeners to collection change event

	@see example.core.DataView
	*/
    override function dataChanged()
    {
        super.dataChanged();

        if (this.previousData != null)
            this.previousData.changed.remove(collectionChanged);

        if (data != null)
            data.changed.add(collectionChanged);

        collectionChanged();
    }

/**
	updates child views based on current size of data
	*/
    function collectionChanged()
    {
        updateStats();

        for(child in children.concat([]))
        {
            if (Std.is(child, ImageView))
            {
                removeChild(child);
            }
        }

        if (data != null)
        {
            for(image in data)
            {
                var view = new ImageView(image);
                addChild(view);
            }
        }
    }

/**
	Updates the stats view based on the number of done Todo items
	*/
    function updateStats()
    {
        if (data == null)
        {
            infoView.setData("No data available");
            return;
        }
        //var remaining = data.getRemaining();

        var info = switch(data.size)
        {
            case 0: "No Images";
            default: data.size + " Images";
        }

        infoView.setData(info);
    }
}

