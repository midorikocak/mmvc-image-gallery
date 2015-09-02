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

import msignal.Signal.Signal1;
import images.gallery.model.Lightbox;
import js.Browser;
import js.html.ImageElement;
import js.html.Element;
import images.core.View;

import images.gallery.model.Image;


import js.html.Event;
import js.Browser.document;

class LightboxView extends View
{
    public var data(default,set):Image;
    //public var lightboxClosed:Signal1<Lightbox>;

    public function new()
    {
        tagName = "div";
        super();
    }

    function set_data(value:Image):Image{
        if(data!=value){
            data = value;
            updateData();
        }
        return value;
    }

    function updateData(){

        var imageElement:ImageElement = Browser.document.createImageElement();
        imageElement.src = data.src;
        imageElement.alt = data.title;

        var titleElement:Element = Browser.document.createElement('h2');
        //titleElement.tagName = 'h2';
        titleElement.innerText = data.title;

        var descriptionElement:Element = Browser.document.createElement('p');
        //descriptionElement.tagName = 'p';
        descriptionElement.innerText = data.description;

        var authorElement:Element = Browser.document.createElement('small');
        //authorElement.tagName = 'small';
        authorElement.innerText = data.author;

        element.appendChild(titleElement);
        element.appendChild(imageElement);
        element.appendChild(descriptionElement);
        element.appendChild(authorElement);
    }
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
		JS only: dispatches ACTIONED event on mouse click
		*/
    function js_onClick(event:js.html.Event)
    {
        dispatch(View.UNHIDEGALLERY, this);
    }

}
