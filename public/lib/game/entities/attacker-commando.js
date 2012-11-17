// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-commando')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerCommando = EntityAttacker.extend({
       class: 'EntityAttackerCommando'
      ,name: 'Commando'
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 20, 20 )
    });
  });