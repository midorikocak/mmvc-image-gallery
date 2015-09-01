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


import js.html.Event;
import js.Browser.document;

/**
View for a single Image model.

@see example.core.DataView
*/
class ImageView extends DataView<Image>
{
    var label:String;
    var done:Bool;


/**
	Overrides constructor to set js tagName to list item (li)
	@param data  	default Image model
	@see images.core.DataView
	*/
    public function new(?data:Image)
    {
        tagName = "li";
        label = "";
        super(data);
    }

/**
	Overrides dataChanged to update internal properties
	@see example.core.DataView
	*/
    /*
    override function dataChanged()
    {
        super.dataChanged();
        label = data != null ? data.name : "";
        done = data != null && data.done;
    }
    */

/**
	Overrides initialized to set click handlers and
	to initialise sub views on flash target

	@see example.core.View
	*/
    override function initialize()
    {
        super.initialize();

        element.onclick = js_onClick;
    }

/**
	Overrides removed to clear event listeners
	@see example.core.View
	*/
    override function remove()
    {
        element.onclick = null;
    }

/**
	Overrides update to set view specific properties in js
	@see images.core.View
	*/
    override function update()
    {
        element.innerHTML = label;
        element.className = className + (done? " done" : "");
        trace("ID: " + toString() + ", label: " + label + ", index: " + index);
    }

/**
		JS only: dispatches ACTIONED event on mouse click
		*/
    function js_onClick(event:js.html.Event)
    {
        dispatch(View.ACTIONED, this);
    }

}
