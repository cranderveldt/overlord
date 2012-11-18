ig.module(
  'plugins.astarUnsticker'
)
  .requires(
  'impact.entity'
).
  defines(function() {

    ig.Entity.inject({
      isStuck : 0
      ,unstick : function(){
        // Try getting unstuck if it's stuck twice.
        var attempt = this.isStuck - 1;

        // Check the heading and move opposite it.
        var jumpX = 0;
        var jumpY = 0;

        var heading = {};
        // If heading left then jump right.
        if(this.headingDirection == 1 || this.headingDirection == 2 || this.headingDirection == 3 ){
          jumpX += this.size.x;
        }

        // If heading right then jump left.
        if(this.headingDirection == 6 || this.headingDirection == 7 || this.headingDirection == 8 ){
          jumpX = this.size.x * -1;
        }

        // If heading up then jump down.
        if(this.headingDirection == 1 || this.headingDirection == 4 || this.headingDirection == 6 ){
          jumpY = this.size.y;
        }

        // If heading down then jump up.
        if(this.headingDirection == 3 || this.headingDirection == 5 || this.headingDirection == 8 ){
          jumpX = this.size.y * -1;
        }

        // On the second attempt switch either the X or Y based on the direction.
        if(attempt == 2)
        {
          if(this.headingDirection == 1){

          }

        }

        this.pos.x += jumpX;
        this.pos.y += jumpY;
        this.lastJump = {x : jumpX, y : jumpY};
        this.isStuck +=1;
      }
    })
  });