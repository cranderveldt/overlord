// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.bullet')
  .requires('impact.entity','plugins.astar')
  .defines(function(){
    EntityBullet = ig.Entity.extend({
       checkAgainst: ig.Entity.TYPE.BOTH
      ,type:  ig.Entity.TYPE.BOTH
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.ACTIVE
      ,zIndex :10
      ,size: {x: 2, y: 2}
      ,damage : 10
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 2, 2 )
      ,init: function(x, y, settings ){
        this.parent( x, y, settings );
        var speed = 200;
        this.addAnim('idle',1,[3]);
        this.target = settings.target;
        var angle = this.angleTo( this.target );
        this.maxVel.x = this.vel.x = this.accel.x = Math.cos(angle) * speed;
        this.maxVel.y = this.vel.y = this.accel.y = Math.sin(angle) * speed;

      }
      ,update: function() {
        // Have the bullet move towards the target.
        this.parent();
      }
      , handleMovementTrace: function( res ) {
        // This completely ignores the trace result (res) and always
        // moves the entity according to its velocity
        if( res.collision.x || res.collision.y){
          this.kill();
        }

        this.parent(res);
      }
      , check: function( other ) {
        if(other.type == ig.Entity.TYPE.B){
          other.receiveDamage(this.damage,this);
        }

        this.kill();
      }
    });
  });