// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-marine')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerMarine = EntityAttacker.extend({
       class: 'EntityAttackerMarine'
      ,name: 'Marine'
      ,animSheet: new ig.AnimationSheet( 'media/players20.png', 20, 20 )
    });
  });