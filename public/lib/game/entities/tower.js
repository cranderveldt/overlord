// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.tower')
  .requires('impact.entity','plugins.astar','game.entities.mob','game.entities.bullet')
  .defines(function(){
    EntityTower = EntityMob.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.FIXED
      ,zIndex :100
      ,size: {x: 16, y: 16}
      ,health: 50
      ,movementspeed : 1
      ,weapon : 'EntityBullet'
      ,veolicty : {x:0,y:0}
      ,speed : 100
      ,fireRange : 200
      ,fireRate : 2
      ,isShootable : true
      ,isSelected : false
      ,moveTarget : null
      ,target : null
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/minion.blue16.png', 16, 16)
      ,init: function( x, y, settings ) {
        this.addAnim('idle',1,[1,2]);
        this.addAnim('firing',.2,[2,3,4,4,3,2]);

        this.weapon = 'EntityBullet';
        this.fireTimer = new ig.Timer(this.fireRate);
        // Call the parent constructor
        this.parent( x, y, settings );

      }
      ,update: function() {
        if(this.target && this.target._killed){
          this.target = null;
        }
        // Check to see if the current target is in range;
        if(this.target && this.inRange(this.target)){

        } else { // Check to see if any attackers are in range.
          this.target = null;
          var attackers = ig.game.getEntitiesByType( 'EntityAttacker' );
          for(var a =0; a < attackers.length; a++){
            var attacker = attackers[a];
            if(this.inRange(attacker))
            {
              this.target = attacker;
              this.currentAnim = this.anims.firing;
              break;
            }
          }
        }

      // Difference between current time and the time .set()
        if(this.target && this.fireTimer.delta() >= 0){
          this.fire(this.target);
          this.fireTimer.reset();
        }

        if(!this.target){
          this.currentAnim = this.anims.idle;
        }

        this.parent();
      }
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
    });
  });