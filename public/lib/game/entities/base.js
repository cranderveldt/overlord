// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.base')
  .requires('impact.entity')
  .defines(function(){
    EntityBase = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER
      ,_wmDrawBox: true
      ,_wmBoxColor: 'rgba(152, 251, 152, 0.5)'
      ,_wmScalable: true
      ,animSheet: new ig.AnimationSheet( 'media/world20.png', 20, 20)
      ,init: function( x, y, settings ) {
        this.parent( x, y, settings );

      }
      ,update: function() {
        this.parent();
      }
      ,draw : function(){
        if(!ig.global.wm) {

          // Draw background.
          var rect = {
            x : (this.pos.x) * ig.system.scale
            , y : (this.pos.y) * ig.system.scale
            , w : (this.size.x) * ig.system.scale
            , h : this.size.y * ig.system.scale
          }

          ig.system.context.fillStyle = 'rgba(152, 251, 152, 0.5)';
          ig.system.context.beginPath();
          ig.system.context.rect(rect.x,rect.y,rect.w,rect.h);
          ig.system.context.closePath();
          ig.system.context.fill();

          ig.gui.draw();
        }
      }
    });
  });