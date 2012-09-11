/**
 * Created with JetBrains WebStorm.
 * User: hero
 * Date: 9/9/12
 * Time: 12:33 PM
 * To change this template use File | Settings | File Templates.
 */
ig.module( 'game.entities.kitten')
  .requires('impact.entity')
  .defines(function(){
    EntityKitten = ig.Entity.extend({
        animSheet : new ig.AnimationSheet('media/DudeWalking.png', 30, 48)
      , size : { x: 30, y: 48}
      , collides: ig.Entity.COLLIDES.FIXED
      , init : function(x,y,settings){
        this.addAnim( 'idle', 5, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );
        this.parent( x, y, settings );
        this.vel.x = -200;
        this.vel.y = 100;
      }
    })
  });