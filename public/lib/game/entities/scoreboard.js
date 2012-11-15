ig.module( 'game.entities.scoreboard')
  .requires('impact.entity','plugins.gui','game.entities.hud')
  .defines(function(){
    EntityScoreboard = EntityHud.extend({
       size: {x: 640, y: 40}
      ,bgColor : "rgb(255,255,255)"
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 640, 40 )
      ,init: function( x, y, settings ) {
        // Don't set the parent items.  this.parent(x,y,settings);
        this.addAnim('idle',1,[0]);
        ig.game.scoreboard = this;
        var scoreboardFont = new ig.Font( 'media/black16.font.png' );
        if(!ig.global.wm) {
          ig.game.spawnEntity( 'EntityWootcounter', this.pos.x+10, this.pos.y+10, { name : 'Defender', wootGlobal : 'wootDefender', font : scoreboardFont} );
          ig.game.spawnEntity( 'EntityWootcounter', this.pos.x+210, this.pos.y+10, { name : 'Attacker', wootGlobal : 'wootOverlord', font : scoreboardFont} );
        }
      }
    });
  });