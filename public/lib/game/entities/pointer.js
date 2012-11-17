// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.pointer')
  .requires('impact.entity')
  .defines(function(){
    EntityPointer = ig.Entity.extend({
       checkAgainst: ig.Entity.TYPE.BOTH
      ,collides: ig.Entity.COLLIDES.NEVER
      ,zIndex: 1000
      ,size: {x: 2, y: 2}
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 2, 2 )
      ,init: function( x, y, settings ) {
        this.addAnim('idle',1,[0]);
        // Call the parent constructor
        this.parent( x, y, settings );

      }
      , update: function() {
        // Update the position to follow the mouse cursor. May also have to account for ig.game.screen.x/y here
        //{ x: ig.input.mouse.x + ig.game.screen.x, y: ig.input.mouse.y + ig.game.screen.y };
        this.pos.x = ig.input.mouse.x;
        this.pos.y = ig.input.mouse.y;
        this.isClicking = ig.input.pressed("mouse1"); // plugins.gui interferes with the click event.
        this.parent();
      }
      , check: function( other ) {
        // User is clicking and the 'other' entity has a 'clicked' function
        if(this.isClicking && typeof(other.clicked) == 'function') {
          this.isClicking = false;
          other.clicked();
        }
      }
    });
  });