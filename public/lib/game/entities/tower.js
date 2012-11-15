// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.tower')
  .requires('impact.entity','plugins.astar','game.entities.mob','game.entities.bullet')
  .defines(function(){
    EntityTower = EntityMob.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.FIXED
      ,zIndex :100
      ,size: {x: 20, y: 20}
      ,health: 50
      ,movementspeed : 1
      ,weapon : 'EntityBullet'
      ,veolicty : {x:0,y:0}
      ,speed : 100
      ,fireRange : 200
      ,fireRate : 2
      ,isSelected : false
      ,moveTarget : null
      ,target : null
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/defenders20.png', 20, 20 )
      ,init: function( x, y, settings ) {
        this.addAnim('idle',1,[3]);
        this.addAnim('clicked',1,[4]);

        this.weapon = 'EntityBullet';
        this.fireTimer = new ig.Timer(this.fireRate);
        // Call the parent constructor
        this.parent( x, y, settings );

      }
      ,fire : function(target){
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
              this.currentAnim = this.anims.clicked;
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
    });
  });