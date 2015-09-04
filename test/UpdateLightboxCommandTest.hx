package ;

import images.gallery.trigger.UpdateLightbox;
import images.gallery.model.Lightbox;
import images.gallery.command.UpdateLightboxCommand;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;


class UpdateLightboxCommandTest 
{
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
	}
	
	@AfterClass
	public function afterClass():Void
	{
	}
	
	@Before
	public function setup():Void
	{

	}
	
	@After
	public function tearDown():Void
	{
	}

	@Test
	public function create_command()
	{
		var updateLightboxCommand:UpdateLightboxCommand = new UpdateLightboxCommand();
		updateLightboxCommand.lightbox = new Lightbox();
		updateLightboxCommand.trigger = new UpdateLightbox(null);
		Assert.isType(updateLightboxCommand, UpdateLightboxCommand);
		trace(updateLightboxCommand.execute());
	}
}