package images.gallery.view;

import images.gallery.model.Image;
import msignal.Signal;
import images.core.View;
import images.gallery.model.Gallery;

class GalleryView extends View
{

    public var data(default, set):Gallery;

    public var itemSelected:Signal1<Image>;

    public function new()
    {
        tagName = "ul";
        itemSelected = new Signal1();
        super();
    }

    function set_data(value:Gallery):Gallery
    {
        if (data != value)
        {
            data = value;
            updateData();
        }
        return value;
    }


    override public function dispatch(event:String, view:View)
    {
        switch(event)
        {
            case View.ACTIONED:

                    if (Std.is(view, ImageView))
                    {
                        var imageView:ImageView = cast view;
                        itemSelected.dispatch(imageView.data);
                    }
            default:
                {
                    super.dispatch(event, view);
                }
        }
    }


    function clearData()
    {
        for (child in children.concat([]))
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
            for (item in data)
            {
                var view = new ImageView();
                view.data = item;
                addChild(view);
            }
        }
    }
}

