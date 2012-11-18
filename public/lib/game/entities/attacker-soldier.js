// Create your own entity, subclassed from ig.Enitity
ig.module( 'game.entities.attacker-soldier')
  .requires('impact.entity','plugins.astar','game.entities.attacker')
  .defines(function(){
    EntityAttackerSoldier = EntityAttacker.extend({
       class: 'EntityAttackerSoldier'
      ,name: 'Soldier'
      ,animSheet: new ig.AnimationSheet( 'media/minion.red16.png', 16, 16)
      ,init: function( x, y, settings ) {
        this.parent(x, y, settings);
      }
    });
  });