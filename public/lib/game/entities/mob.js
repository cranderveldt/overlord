// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.mob')
  .requires('impact.entity','plugins.astar','plugins.moveHelper')
  .defines(function(){
    EntityMob = ig.Entity.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.PASSIVE
      ,pathEntities : ['EntityFarm','EntityMob','EntityHud'] // EntityHud isn't working with aStar, maybe because it's so big.
      ,zIndex :10
      ,size: {x: 16, y: 16}
      ,fireRange : 200
      ,fireRate : 2
      ,clicked: function() {
        if(!this.selected) {// Don't select yourself.
        // Get a list of all active mobs and set this item as the target.
          var mobs = ig.game.getEntitiesByType( 'EntityAttacker' );

          for(var i = 0; i < mobs.length; i++)
          {
            var mob = mobs[i];
            if(mob != this && mob.isSelected && typeof(mob.setTarget) == 'function' && mob.target == null){
              mob.setTarget(this);
              mob.unselect();
            }
          }
        }
      }
      ,unselect: function(){
        this.isSelected = false;
        this.currentAnim = this.anims.idle;
      }
      ,fire : function(target){
        var shoot = false;
        if(this.fireTimer && this.fireTimer.delta() >= 0){
          shoot = true;
          this.fireTimer.reset();
        }

        if(shoot){
          var positions = this.getPositions();
          var spawn = { x : positions.center.x, y : positions.center.y};

          if(target.pos.x > positions.right){
            spawn.x = positions.right;
          }

          if(target.pos.x < positions.left)
          {
            spawn.x = positions.left;
          }

          if(target.pos.y < positions.top){
            spawn.y = positions.top;
          }

          if(target.pos.y > positions.bottom){
            spawn.y = positions.bottom;
          }

          ig.game.spawnEntity( this.weapon, spawn.x, spawn.y, { target : target} ); //Nothing to special here, just make sure you pass the angle we calculated in
        }
      }
      // target is a mob.
      ,inRange: function(target) {
        // This is to the center. Need to check for size.
        var isInRange = this.distanceTo(target) <= this.fireRange;
        var isDirectShot = false;
        if(isInRange){
          var positions = target.getPositions();
          this.getPath(positions.center.x,positions.center.y,true);
          isDirectShot = this.path.length <= 2;
        }

        return isInRange && isDirectShot;
      }
      ,triggerEvac : function(){
        this.evacTimer = new ig.Timer(3);
      }
      ,evac : function(){
        var guiElement = ig.gui.element.action('getByName', this.name);
        guiElement.count += 1;
        guiElement.disabled = false;
        this.kill();

      }
      ,update : function(){
        if(this.evacTimer && this.evacTimer.delta() >= 0){
          this.evac();
        }
        this.parent();
      }
      ,draw: function(){
        if(!ig.global.wm){
          // Draw health bar
          if(this.health && this.maxHealth){
            var position = this.getPositions();
            var rect = {
                x : (position.left + 1) * ig.system.scale
              , y : (position.top - 7) * ig.system.scale
              , w : (14) * ig.system.scale // Force the size.
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