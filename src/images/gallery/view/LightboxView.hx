package images.gallery.view;

import msignal.Signal;
import images.gallery.model.Image;
import js.Browser;
import js.html.ImageElement;
import js.html.Element;
import images.core.View;
import js.html.Event;
import js.Browser.document;

class LightboxView extends View
{
    public var lightboxUpdated:Signal1<Image>;

    public var closeLightbox:Signal0;

    var imageElement:ImageElement;
    var titleElement:Element;
    var descriptionElement:Element;
    var authorElement:Element;
    var closeElement:Element;

    public function new()
    {
        tagName = "div";
        super();

        imageElement = Browser.document.createImageElement();
        titleElement = Browser.document.createElement('h2');
        descriptionElement = Browser.document.createElement('p');
        authorElement = Browser.document.createElement('small');
        closeElement = Browser.document.createElement('div');
        closeElement.className = "closeLightbox";
        closeElement.innerText = "Close";

        closeElement.onclick = function(event:js.html.Event){
            closeLightbox.dispatch();
        };

        lightboxUpdated = new Signal1();
        closeLightbox = new Signal0();

        element.appendChild(titleElement);
        element.appendChild(closeElement);
        element.appendChild(imageElement);
        element.appendChild(descriptionElement);
        element.appendChild(authorElement);

    }

    public function updateData(data:Image)
    {
        if(data==null){
            element.hidden = true;
        }
        else{
            element.hidden = false;
            imageElement.src = data.src;
            imageElement.alt = data.title;

            titleElement.innerText = data.title;
            descriptionElement.innerText = data.description;
            authorElement.innerText = data.author;
        }
    }

    override function initialize()
    {
        super.initialize();

        //element.onclick = js_onClick;
        //closeElement.onclick = js_onClick;
    }


    override function remove()
    {
        element.onclick = null;
    }

    function js_onClick(event:js.html.Event)
    {
        trace('osman');
        //dispatch(View.UNHIDEGALLERY, this);
    }

}
