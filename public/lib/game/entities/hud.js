// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.hud')
  .requires('impact.entity','plugins.gui')
  .defines(function(){
    EntityHud = ig.Entity.extend({
       _wmDrawBox : true
      ,collides: ig.Entity.COLLIDES.FIXED
      ,bgColor : "rgb(220,220,220)"
      ,size: {x: 480, y: 60}
      ,zIndex : 0
      // Load an animation sheet
      ,init: function( x, y, settings ) {
        this.parent(x,y,settings);
        if(!ig.global.wm) {

          var scoreboardFont = new ig.Font( 'media/black16.font.png' );
          ig.game.spawnEntity( 'EntityWootcounter', this.pos.x+10, this.pos.y+10, { name : 'Woot', wootGlobal : 'wootOverlord', font : scoreboardFont} );


          this.overlordBases = ig.game.getEntitiesByType('EntityBase');
          ig.game.hud = this;
          var hud = this;
          // Add the text
          var guiFont = new ig.Font( 'media/black8.font.png' );
          // Get a list of all the available HUD Commands.

          // Get a list of all available minions.
          var minions = ig.game.overlordMinions;

          var offsetX = this.pos.x + 200;
          var offsetY = this.pos.y + 20;
          for(var m = 0; m < minions.length; m++){
            var minion = minions[m];
            var minionSettings = {
              name: minion.name
             ,minion : minion
             ,title: minion.name
             ,font : guiFont
             ,showTitle : true
             ,count : 3
             ,group: 'minions'
             ,size: { x: minion.size.x, y: minion.size.y + 15}
             ,pos: { x: offsetX + m*50 , y: offsetY }
             ,state: {
               normal: {
                 image: minion.animSheet.image
                 , tile: 1
                 , tileSize: minion.size.x
               }
               , hover: {
                 image: minion.animSheet.image
                 , tile: 2
                 , tileSize:  minion.size.x
               }
                , active: {
                  image: minion.animSheet.image
                  , tile: 0
                  , tileSize:  minion.size.x
                }
             },
             click: function() {
               var base;
               if(hud.overlordBases.length > 0)
               {
                 base = hud.overlordBases[0];
               } else {
                 hud.overlordBases = ig.game.getEntitiesByType('EntityBase');
                 base = hud.overlordBases[0];
               }

               if(this.count > 0){
                 ig.game.spawnEntity(this.minion.class,base.pos.x+10,base.pos.y+10);
                 this.count -= 1;

                 if(this.count == 0){
                   this.disabled = true;
                 }
               }
             }
            }
            ig.gui.element.add(minionSettings);
          }
        }
      }
      ,draw : function(){
        if(!ig.global.wm) {
          if(ig.gui.show){

            // Draw background.
            var rect = {
              x : (this.pos.x) * ig.system.scale
              , y : (this.pos.y) * ig.system.scale
              , w : (this.size.x) * ig.system.scale
              , h : this.size.y * ig.system.scale
            }

            ig.system.context.fillStyle = this.bgColor;
            ig.system.context.beginPath();
            ig.system.context.rect(rect.x,rect.y,rect.w,rect.h);
            ig.system.context.closePath();
            ig.system.context.fill();

            ig.gui.draw();
          }
        }
        this.parent();
      }
    });
  });