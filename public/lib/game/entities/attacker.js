// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker')
  .requires('impact.entity','game.entities.mob','plugins.astar','plugins.astarUnsticker')
  .defines(function(){
    EntityAttacker = EntityMob.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.ACTIVE
      ,checkAgainst: ig.Entity.TYPE.BOTH
      ,zIndex :100
      ,size: {x: 16, y: 16}
      ,health: 50
      ,maxHealth: 50
      ,movementspeed : 1
      ,veolicty : {x:0,y:0}
      ,prevPos : { x:-1,y:-1}
      ,speed : 100
      ,isSelected : false
      ,moveTarget : null
      ,target : null
      // Load an animation sheet
      ,animSheet: new ig.AnimationSheet( 'media/minion.red16.png', 16, 16 )
      ,init: function( x, y, settings ) {
        this.addAnim('idle',.5,[1,2]);
        this.addAnim('selected',1,[0]);
        this.addAnim('moving',.2,[1,2,3,4,4,3,2,1]);
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

          this.calculatePath(x,y);
        }

        // If you're stuck recalculate the path.
        if(this.path && this.prevPos.x == this.pos.x && this.prevPos.y == this.pos.y)
        {
          this.isStuck += 1;
          var destination = this.path[this.path.length-1];
          this.calculatePath(destination.x,destination.y);
        } else {
          this.isStuck = 0;
        }

        if(!this.isSelected) {
          if(this.headingDirection == 0 && this.currentAnim != this.anims.idle){
            this.currentAnim = this.anims.idle;
            this.size = {x: 16,y:16};
          }

          if(this.headingDirection > 0 && this.currentAnim != this.anims.moving){
            this.currentAnim = this.anims.moving;
          }
        }

        this.prevPos = { x : this.pos.x, y : this.pos.y};
        this.followPath(this.speed,true);
        this.parent();
      }
      ,calculatePath: function(x,y){
        if(this.isStuck >= 2){
          // Move to the previous position.
          this.size = {x: 8,y:8};
        }

        if(this.target){
          this.getPath(this.target.pos.x,this.target.pos.y,true,this.pathEntities,[this.target]);
        } else { // Click to move
          this.getPath(x,y,true,this.pathEntities);
        }


      }
      ,draw : function(){
        this.drawPath(255, 255, 0, 0.8,1);
        this.parent();
      }
      ,clicked: function() {
        this.isSelected = !this.isSelected;
        this.currentAnim = this.anims.idle;
        if(this.isSelected){
          this.currentAnim = this.anims.selected;
        }

        this.parent();
      }
      ,check : function(other){
        if(other == this.target && typeof(other.activate) == 'function') {
          this.isActivating = true;
          other.activate(this);
        }
      }
    });
  });