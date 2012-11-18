ig.module( 'game.entities.farm')
  .requires('impact.entity')
  .defines(function(){
    EntityFarm = ig.Entity.extend({
       type: ig.Entity.TYPE.A
      ,checkAgainst: ig.Entity.TYPE.B
      ,collides : ig.Entity.COLLIDES.FIXED
      ,size: {x: 16, y: 16}
      ,zIndex : 0
      ,woot : 100
      ,wootRefreshAmount : 50
      ,wootRefresh : 5
      ,animSheet: new ig.AnimationSheet( 'media/minion.gold16.png', 16, 16 )
      ,init: function( x, y, settings ) {
        this.addAnim('idle',1,[1]);
        this.addAnim('harvesting',.1,[1,2,3,3,2,1]);
        this.addAnim('empty',1,[4]);
        this.parent( x, y, settings );
        this.refreshTimer
      }
      ,refreshWoot :function(){
        this.woot = this.wootRefreshAmount
        this.currentAnim = this.anims.idle;
        this.refreshTimer.reset();
      }
      ,harvestWoot : function(harvester){
        if(harvester.isActivating){
          if(!this.isStarted){
            // TODO harvester should have a woot harvest rate.
            this.refreshTimer = new ig.Timer(3);
            this.isStarted = true;
          }

          this.harvester = harvester;
          this.currentAnim = this.anims.harvesting;
        }
      }
      ,update: function() {
        if(this.harvester && this.refreshTimer.delta() >= 0){
          this.harvester.getWoot(this.woot);
          this.harvester.evac();
          this.kill();
        }

        this.parent();
      }
      ,clicked: function() {
        // Get a list of all active mobs and set this item as the target.
        var mobs = ig.game.getEntitiesByType( 'EntityAttacker' );

        for(var i = 0; i < mobs.length; i++)
        {
          var mob = mobs[i];
          if(mob.isSelected && mob.target == null){
            mob.setTarget(this);
            mob.unselect();
          }
        }
        this.isSelected = !this.isSelected;
      }
      ,activate : function(other){
        this.harvestWoot(other);
      }
    });
  });