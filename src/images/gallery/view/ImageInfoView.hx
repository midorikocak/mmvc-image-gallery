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

import js.Browser;
import js.html.Element;


/**
Provides summary information on the current TodoList

@see example.core.DataView
@see example.todo.model.TodoList
*/
class ImageInfoView extends DataView<String>
{

    var label:Element;
    var button:Element;

/**
	Overrides constructor to set js tag name to unordered list (ul)

	@param data 	default TodoList
	@see example.core.DataView
	*/
    public function new(?data:String)
    {
        super(data);
    }

/**
	Overrides initialized to initialise sub views on flash target

	@see example.core.View
	*/
    override function initialize()
    {
        super.initialize();


        label = Browser.document.createElement("label");
        label.innerHTML = data != null ? data : "Loading items...";
        element.appendChild(label);

        button = Browser.document.createElement("a");
        button.innerHTML = "New item";
        button.onclick = js_onClick;
        element.appendChild(button);

    }

    override function remove()
    {
        super.remove();

        button.onclick = null;

    }

/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
    override function update()
    {
        if (data != null)
        {

            label.innerHTML = data;
        }
    }


    function js_onClick(event:js.html.Event)
    {
        dispatch(View.ACTIONED, this);
    }

}
