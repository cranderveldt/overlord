// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-sniper')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerSniper = EntityAttacker.extend({
       class: 'EntityAttackerSniper'
      ,name: 'Sniper'
      ,animSheet: new ig.AnimationSheet( 'media/defenders20.png', 20, 20 )
      , init : function(x,y,settings){
        this.parent(x,y,settings);
        this.addAnim('idle',1,[5]);
        this.addAnim('clicked',1,[6]);
      }
    });
  });