// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.hud')
  .requires('impact.entity','plugins.gui')
  .defines(function(){
    EntityHud = ig.Entity.extend({
       _wmDrawBox : true
      ,collides: ig.Entity.COLLIDES.FIXED
      ,bgColor : "rgb(220,220,220)"
      ,size: {x: 640, y: 60}
      ,zIndex : 0
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 640, 40 )
      ,init: function( x, y, settings ) {
        this.parent(x,y,settings);
        this.addAnim('idle',1,[0]);
        this.overlordBases = ig.game.getEntitiesByType('EntityBase');
        ig.game.hud = this;
        if(!ig.global.wm) {
          var hud = this;
          // Add the text

          // Get a list of all the available HUD Commands.

          // Get a list of all available minions.
          var minions = ig.game.overlordMinions;

          var offsetX = this.pos.x + 20;
          var offsetY = this.pos.y + 20;
          for(var m = 0; m < minions.length; m++){
            var minion = minions[m];
            var minionSettings = {
              name: minion.name
             ,title: minion.name
             ,showTitle : true
             ,group: 'minions'
             ,size: { x: minion.size.x, y: minion.size.y}
             ,pos: { x: offsetX + m*20 , y: offsetY }
             ,state: {
               normal: {
                 image: minion.animSheet.image
                 , tile: 2
                 , tileSize: minion.size.x
               }
               , hover: {
                 image: minion.animSheet.image
                 , tile: 3
                 , tileSize:  minion.size.x
               }
                , active: {
                  image: minion.animSheet.image
                  , tile: 4
                  , tileSize:  minion.size.x
                }
             },
             click: function() {
                 var base = hud.overlordBases[0];
                 ig.game.spawnEntity(minion.class,base.pos.x+10,base.pos.y+10);
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