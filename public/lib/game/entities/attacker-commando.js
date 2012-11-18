// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-commando')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerCommando = EntityAttacker.extend({
       class: 'EntityAttackerCommando'
      ,name: 'Commando'
      ,animSheet: new ig.AnimationSheet( 'media/minion.green16.png', 16, 16)
      ,init: function(x,y,settings){
        this.parent(x, y,settings);
      }
    });
  });