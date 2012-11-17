// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker')
  .requires('impact.entity','plugins.astar','game.entities.mob')
  .defines(function(){
    EntityAttacker = EntityMob.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.ACTIVE
      ,checkAgainst: ig.Entity.TYPE.BOTH
      ,zIndex :100
      ,size: {x: 20, y: 20}
      ,health: 50
      ,maxHealth: 50
      ,movementspeed : 1
      ,veolicty : {x:0,y:0}
      ,speed : 100
      ,isSelected : false
      ,moveTarget : null
      ,target : null
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 20, 20 )
      ,init: function( x, y, settings ) {
        this.addAnim('idle',1,[3]);
        this.addAnim('clicked',1,[4]);
        // Call the parent constructor
        this.parent( x, y, settings );

      }
      ,getWoot : function(woot){
        ig.game.wootOverlord += woot;
      }
      ,setTarget : function(target){
        this.target = target;
        this.getPath(this.target.pos.x,this.target.pos.y,true,this.pathEntities,[this.target]);
      }
      ,update: function() {
        var isValidClick = false;
        // If there's a click while this is selected set the target.
        if(this.isSelected && ig.input.pressed('mouse1')){
          isValidClick = !(ig.game.pointerIsOnEntity(ig.game.scoreboard) || ig.game.pointerIsOnEntity(ig.game.hud));
        }

        // Don't let the user change the target.
        if(this.target){
          isValidClick = false;
        }

        if(isValidClick){
          var x = ig.input.mouse.x;
          var y = ig.input.mouse.y

          // Check to see if the click is not on the current target.
          if(this.target){
            var isOnX =  this.target.pos.x <= x && x <= this.target.pos.x +this.target.size.x;
            var isOnY =  this.target.pos.y <= y && y <= this.target.pos.y +this.target.size.y;
            if(!isOnX || !isOnY){  // If they click off of the target get rid of the target.
              this.target = null;
            }
          }

          if(this.target){
            this.getPath(this.target.pos.x,this.target.pos.y,true,this.pathEntities,[this.target]);
          }else { // No more click to move, Only click to target.
            //this.getPath(x,y,true,this.pathEntities,[]);
          }
        }

        // Check to see if the object reached the target.
        if(this.target){
          // If you're stuck recalculate the path.
          if(this.prevPos.x == this.pos.x && this.prevPos.y == this.pos.y)
          {
            this.getPath(this.target.pos.x,this.target.pos.y,true,this.pathEntities,[this.target]);
          }
        }

        this.prevPos = { x : this.pos.x, y : this.pos.y};
        this.followPath(this.speed,true);
        this.parent();
      }
      ,draw : function(){
        this.drawPath(255, 255, 0, 0.8,1);
        this.parent();
      }
      ,clicked: function() {
        this.isSelected = !this.isSelected;
        this.currentAnim = this.anims.idle;
        if(this.isSelected){
          this.currentAnim = this.anims.clicked;
        }
        //this.game.$scoreboard.update({player:'player one'});
        /* Handle the click */
      }
      ,check : function(other){
        if(other == this.target && typeof(other.activate) == 'function') {
          other.activate(this);
        }
      }
    });
  });