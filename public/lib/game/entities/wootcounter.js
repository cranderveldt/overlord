// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.wootcounter')
  .requires('impact.entity')
  .defines(function(){
    EntityWootcounter = ig.Entity.extend({
        zIndex : 1
      , woot: 0 // custom property
      ,name: "Woot"// custom property\
      ,init: function( x, y, settings ) {
        this.wootGlobal = 'wootOverlord';
        this.parent( x, y, settings );
        this.font = ig.game.font;
        if(settings && settings.font){
          this.font = settings.font;
        }
      }
      ,update: function() {
        this.woot =  ig.game[this.wootGlobal];
      }
      , draw :function(){
        this.font.draw(this.name + " " + this.woot, this.pos.x, this.pos.y, ig.Font.ALIGN.LEFT );

      }
    });
  });