window.onload = function() {
    
    var SurfGame = function () {

        this.bmd = null;

        this.points = {
            'x': [ 32, 128, 256, 384, 512, 608 ],
            'y': [ 240, 240, 240, 240, 240, 240 ]
        };

    };
    
    
 SurfGame.prototype = {

    //Variables of the game
    stockValues: new Array(),
    graphPlot: undefined,
    sprite: undefined,
    
    preload: function(){
         game.load.image('logo', 'phaser.png');
        
    },
    
    create: function () {

        //Put the logo on the background
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        
        //Generate 100 random stock values
        for (i = 0; i < 100; i++) {
            var new_y = Math.floor((Math.random() * 100) + 1);  // between 1 and 100
            this.stockValues.push(new_y);
        }
        
        
        //Generate the Graphic object for the plot
        this.graphPlot = game.add.graphics(5,200);
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();
        this.generatePlotGraphic();
        
        //Generate the sprite for the graphic
        this.sprite = game.add.sprite(400, 300, this.graphPlot.generateTexture());
        this.sprite.anchor.set(0.5);
        this.sprite.scale.setTo(3, 3);
        this.graphPlot.destroy();
        //this.sprite.animations.add('run');
        //this.sprite.scale.setTo(10,10);
        //this.sprite.animations.play('run', 10, true);

    },

    render: function () {
        //xPosition++;
        this.sprite.x -= 1;
        //console.log("plot");

        //game.debug.spriteInfo(this.sprite, 20, 32);
        //this.bmd.clear();
        //Simply plot the function
        //this.graphPlot.moveTo(500,50);
    


    },
    generatePlotGraphic: function(){
        for (i = 0; i < this.stockValues.length - 1; i++) {
          ini_y = this.stockValues[i];
          fin_y = this.stockValues[i+1];
          ini_x = i*5;
          fin_x = (i+1)*5;


          // set a fill and line style
          this.graphPlot.beginFill(0xFF3300);
          this.graphPlot.lineStyle(2, 0xffd900, 1);

          // draw a shape
          this.graphPlot.moveTo(ini_x, ini_y);
          this.graphPlot.lineTo(fin_x, fin_y);
    }
    }

};

    
    
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
  game.state.add('Game',SurfGame,true);
  
  

};
