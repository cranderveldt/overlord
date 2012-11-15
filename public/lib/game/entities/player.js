// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.player')
  .requires('impact.entity','plugins.astar')
  .defines(function(){
    EntityPlayer = ig.Entity.extend({
      type:  ig.Entity.TYPE.B
      // Set some of the properties
      ,collides: ig.Entity.COLLIDES.PASSIVE
      ,zIndex :100
      ,size: {x: 20, y: 20}
      ,health: 50
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
        this.getPath(this.target.pos.x,this.target.pos.y,true,['EntityFarm'],[this.target]);
      }
      ,update: function() {

        // If there's a click while this is selected set the target.
        if(this.isSelected && ig.input.pressed('mouse1')){
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
            this.getPath(this.target.pos.x,this.target.pos.y,true,['EntityFarm'],[this.target]);
          }else {
            this.getPath(x,y,true, ['EntityFarm'],[]);
          }
        }

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
    });
  });