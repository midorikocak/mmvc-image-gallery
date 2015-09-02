package images.gallery.model;
import msignal.Signal.Signal0;
class Lightbox
{
    public var dataChanged(default,null):Signal0;
    public var data(default,set):Image;

    public function new()
    {
        dataChanged = new Signal0();
    }

    function set_data(value:Image):Image
    {
        if(data!=value){
            data = value;
            dataChanged.dispatch();
            trace('model data changed');
        }
        return value;
    }
}
