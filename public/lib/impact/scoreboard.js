ig.module(
  'impact.scoreboard'
)
  .defines(function() {
    ig.Scoreboard = ig.Class.extend({
      className:    'scoreboard',
      toggleKey:     null,
      startVisible:  true,

      init: function() {
        var $canvas = $(ig.system.canvas);
        var ctx=ig.system.context;
        ctx.fillStyle="#FF0000";
        ctx.fillRect(0,0,150,75);

        // Create the overlay object var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
        /*this.$scoreboard = $('<div>')
          .addClass(this.className)
          .css({position: 'relative', "background-color": 'yellow'})
          .width($canvas.width())
          .height(50)
          .offset($canvas.offset());

        // Status bars section (health, stamina, xp)
        this.$statusBarsSection = $('<div>').css({
          position: 'absolute',
          right:        '10px',
          bottom:        '0px',
          width:       '200px'
        });

        // Health bar section
        this.$healthBarSection = $('<div>')
          .addClass('progress')
          .css({marginBottom: '10px'})
          .append(
          $('<div>')
            .addClass('bar bar-success'))
          .append(
          $('<span>')
            .addClass('bar-label')
            .css({
              color: 'blue',
              width: '200px',
              textAlign: 'center'
            }))
          .append(
          $('<span>')
            .addClass('bar-player')
            .css({
              color: 'pink',
              width: '200px',
              textAlign: 'center'
            }));
        this.$statusBarsSection.append(this.$healthBarSection );
        this.$scoreboard.append(this.$statusBarsSection);

        // Insert the overlay immediately after the canvas object
        $canvas.after(this.$scoreboard);

        // Bind a toggle key, if supplied
        if (this.toggleKey)
        {
          ig.input.bind(this.toggleKey, 'toggle-'+this.className);
        }

        // Show it if it starts visible
        this.$scoreboard.toggle(this.startVisible);*/
      }
      ,update: function(data){
        $('.bar-label', this.$healthBarSection ).text(data.health);
        $('.bar-player', this.$healthBarSection ).text(data.player);
      }

    });
  });
