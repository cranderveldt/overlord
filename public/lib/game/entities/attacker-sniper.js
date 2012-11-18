// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-sniper')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerSniper = EntityAttacker.extend({
       class: 'EntityAttackerSniper'
      ,name: 'Sniper'
      ,animSheet: new ig.AnimationSheet( 'media/minion.purple16.png', 16, 16)
      ,init: function(x,y,settings){
        this.parent(x, y,settings);
      }
    });
  });