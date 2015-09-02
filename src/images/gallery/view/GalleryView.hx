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

import images.gallery.view.LightboxView;
import images.core.View;
import images.gallery.model.Gallery;

/**
//Main TodoList view containing a list of Todo items

//Updates individual todo item state when user clicks on a todo item

@see images.core.DataView
@see images.gallery.view.ImageView
@see images.gallery.model.Gallery
*/
class GalleryView extends View
{

    public var data(default,set):Gallery;

/**
	Overrides constructor to set js tag name to unordered list (ul)

	@param data 	default TodoList
	@see example.core.DataView
	*/
    public function new()
    {
        tagName = "ul";
        super();
    }

    function set_data(value:Gallery):Gallery{
        if(data!=value){
            data = value;
            updateData();
        }
        return value;
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
                        var imageView:ImageView = cast view;
                        trace('clicked');
                        //trace(imageView.data);
                        //element.remove();
                        var lightboxView = new LightboxView();
                        lightboxView.data = imageView.data;
                        clearData();
                        addChild(lightboxView);
                    }
                }
            case View.UNHIDEGALLERY:
                if (Std.is(view, LightboxView))
                {
                    var lightboxView:LightboxView = cast view;
                    trace('close');
                    updateData();
                    removeChild(lightboxView);
                }
            default:
                {
                    super.dispatch(event, view);
                }
        }
    }


    function clearData(){
        for(child in children.concat([]))
        {
            if (Std.is(child, ImageView))
            {
                removeChild(child);
            }
        }
    }


/**
	updates child views based on current size of data
	*/
    function updateData()
    {
        clearData();

        if (data != null)
        {
            for(item in data)
            {
                var view = new ImageView();
                view.data = item;
                addChild(view);
            }
        }
    }
}

