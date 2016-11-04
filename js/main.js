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
    numCompanies: 3,
    all_companies_stock: new Array(),
    graphPlot: undefined,
    sprites: new Array(),
    
    preload: function(){
         game.load.image('logo', 'phaser.png');
        
    },
    
    create: function () {

        //Put the logo on the background
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        
        
        console.log("Que pasa loco");
        init_all_companies_stocks(this.all_companies_stock,this.numCompanies);
        console.log("La pase");
        //Generate 100 random stock values
        /*for (i = 0; i < 100; i++) {
            var new_y = Math.floor((Math.random() * 100) + 1);  // between 1 and 100
            this.stockValues.push(new_y);
        }*/
        
        
        for(var i = 0; i < this.numCompanies; i++){
            
             //Generate the Graphic object for the plot
             var graphic = game.add.graphics(5,200);
             this.bmd = this.add.bitmapData(this.game.width, this.game.height);
             this.bmd.addToWorld();
             this.generatePlotGraphic(i,graphic);
            
            //Generate the sprite for the graphic
             var currentSprite = game.add.sprite(400, 300, graphic.generateTexture());
    
             this.sprites.push(currentSprite);
             currentSprite.anchor.set(0.5);
             currentSprite.scale.setTo(3, 3);
             graphic.destroy();
            
        }
       

    },

    render: function () {
        //xPosition++;
        for(var i = 0; i < this.numCompanies; i++){
            this.sprites[i].x--;
            
        }
       
        //console.log("plot");

        //game.debug.spriteInfo(this.sprite, 20, 32);
        //this.bmd.clear();
        //Simply plot the function
        //this.graphPlot.moveTo(500,50);
    


    },
    generatePlotGraphic: function(j,graphObject){
        for (i = 0; i < this.all_companies_stock[j].length - 1; i++) {
          ini_y = this.all_companies_stock[j][i];
          fin_y = this.all_companies_stock[j][i+1];
          ini_x = i*5;
          fin_x = (i+1)*5;


          // set a fill and line style
          graphObject.beginFill(0xFF3300);
          graphObject.lineStyle(2, 0xffd900*(j+1), 1);

          // draw a shape
          graphObject.moveTo(ini_x, ini_y);
          graphObject.lineTo(fin_x, fin_y);
    }
    }

};

    
    
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
  game.state.add('Game',SurfGame,true);
  
  

};
