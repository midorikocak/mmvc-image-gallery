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

package images.app;

import mmvc.api.IViewContainer;


// Main Application
import images.app.ApplicationView;
import images.app.ApplicationViewMediator;

// TODO Module
import images.gallery.trigger.LoadGallery;
import images.gallery.command.LoadGalleryCommand;
import images.gallery.model.Gallery;
import images.gallery.view.GalleryView;
import images.gallery.view.GalleryViewMediator;


/**
Application wide context.
<p>Provides mapping of following classes:
<ul>
	<li>Signals to commands</li>
	<li>Models</li>
	<li>Views to ViewMediators</li>
</ul>
</p>
@see mmvc.impl.Context
*/
class ApplicationContext extends mmvc.impl.Context
{
    public function new(?contextView:IViewContainer=null)
    {
        super(contextView);
    }

/**
	Overrides startup to configure all context commands, models and mediators
	@see mmvc.impl.Context
	*/
    override public function startup()
    {
// wiring for gallery model
        //commandMap.mapSignalClass(LoadGallery, LoadGalleryCommand);
        triggerMap.map(LoadGallery,LoadGalleryCommand);
        injector.mapSingleton(Gallery);

        mediatorMap.mapView(GalleryView, GalleryViewMediator);

// wiring for main application module
        mediatorMap.mapView(ApplicationView, ApplicationViewMediator);
    }

/**
	Overrides shutdown to remove/cleanup mappings
	@see mmvc.impl.Context
	*/
    override public function shutdown()
    {

    }
}
