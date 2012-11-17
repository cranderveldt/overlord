ig.module( 
	'game.main' 
)
.requires(
	 'impact.game'
	,'impact.font'
  ,'impact.scoreboard'
  ,'game.levels.region1'
  ,'game.entities.wootcounter'
  ,'game.entities.attacker-soldier'
  ,'game.entities.attacker-sniper'
  ,'game.entities.attacker-commando'
  //,'plugins.gui'

)
.defines(function(){

MyGame = ig.Game.extend({

	 font: new ig.Font( 'media/white16.font.png' )
	, wootOverlord : 0
  , wootDefender : 0
  , overlordMinions : new Array()
	,init: function() {
		// Initialize your game here; bind keys etc.
    ig.input.bind( ig.KEY.MOUSE1, 'mouse1' ); // This is also bound in plugins.gui

    // Load all of the minions for the overlord.  This would be done on overlord selection screen or on minion purchase.
    this.overlordMinions.push(new EntityAttackerSoldier());
    this.overlordMinions.push(new EntityAttackerSniper());
    this.overlordMinions.push(new EntityAttackerCommando());
    this.loadLevel(LevelRegion1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},
	draw: function() {
		this.parent();
	}
  ,pointerIsOnEntity: function(entity){
    var isOnX =  entity.pos.x <= ig.input.mouse.x && ig.input.mouse.x <= entity.pos.x +entity.size.x;
    var isOnY =  entity.pos.y <= ig.input.mouse.y && ig.input.mouse.y <= entity.pos.y +entity.size.y;

    return isOnX && isOnY;
  }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});
