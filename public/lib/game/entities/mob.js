// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.mob')
  .requires('impact.entity','plugins.astar')
  .defines(function(){
    EntityMob = ig.Entity.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.PASSIVE
      ,pathEntities : ['EntityFarm','EntityMob','EntityHud'] // EntityHud isn't working with aStar, maybe because it's so big.
      ,zIndex :10
      ,size: {x: 20, y: 20}
      ,getPositions : function(){
        var positions = {
            left : this.pos.x
          , right : this.pos.x + this.size.x
          , top : this.pos.y
          , bottom : this.pos.y + this.size.y
          , center : {x: (this.pos.x + this.size.x/2), y: (this.pos.y + this.size.y/2) }
        };

        return positions;
      }
      ,clicked: function() {
        this.isSelected = !this.isSelected;
        this.currentAnim = this.anims.idle;
        if(this.isSelected){
          this.currentAnim = this.anims.clicked;
        }

        if(!this.selected) {// Don't select yourself.
        // Get a list of all active mobs and set this item as the target.
          var mobs = ig.game.getEntitiesByType( 'EntityAttacker' );

          for(var i = 0; i < mobs.length; i++)
          {
            var mob = mobs[i];
            if(mob.isSelected && typeof(mob.setTarget) == 'function'){
              mob.setTarget(this);
            }
          }
        }
      }

      // target is a mob.
      ,inRange: function(target) {

        // This is to the center. Need to check for size.
        return this.distanceTo(target) <= this.fireRange
      }
      ,draw: function(){
        if(!ig.global.wm){
          // Draw health bar
          if(this.health && this.maxHealth){
            var position = this.getPositions();
            var rect = {
                x : (position.left + 1) * ig.system.scale
              , y : (position.top - 7) * ig.system.scale
              , w : (this.size.x-2) * ig.system.scale
              , h : 2 * ig.system.scale
            }

            // Health bar border/background
            ig.system.context.fillStyle = "rgb(0,0,0)";
            ig.system.context.beginPath();
            ig.system.context.rect(rect.x,rect.y,rect.w,rect.h);
            ig.system.context.closePath();
            ig.system.context.fill();

            // Current Health
            ig.system.context.fillStyle = "rgb(255,0,0)";
            ig.system.context.beginPath();
            ig.system.context.rect(rect.x,rect.y,rect.w * (this.health / this.maxHealth),rect.h);
            ig.system.context.closePath();
            ig.system.context.fill();
          }
        }
        this.parent();
    }
    });
  });