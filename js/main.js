window.onload = function() {
    
    var SurfGame = function () {
        //Creamos el objeto surfGame

    };
    
    
 SurfGame.prototype = {

     
    //Constants
     PIXELS_PER_POINT: 100,
     GAME_SPEED: 1,
     Y_OFFSET_OF_GRAPH:200,
     SURFER_DIMENSIONS: 50,
     X_OFFSET_OF_SURFER:30,
    //Variables of the game
    stockValues: new Array(),
    numCompanies: 3,
    all_companies_stock: new Array(),
    graphPlot: undefined,
    sprites: new Array(),
    surfer:undefined,
    advancedPixels:0, //Number of pixels moved in the game,
    surferSlope:0,
    
    preload: function(){
         game.load.image('logo', 'phaser.png');
         game.load.image('surfer','surfer.png');
        
    },
    
    create: function () {

        //Put the logo on the background
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        
        
        //Init data of all stocks
        init_all_companies_stocks(this.all_companies_stock,this.numCompanies);
        
        //Generate the sprite for the surfer
        this.surfer = game.add.sprite(this.X_OFFSET_OF_SURFER, 0, 'surfer');
        
        game.physics.arcade.enable([this.surfer]);

	game.physics.arcade.gravity.y = 200;

        this.surfer.body.allowGravity = false;
           
        
        //Generate the sprites for the plots
        for(var i = 0; i < this.numCompanies; i++){
            
             //Generate the Graphic object for the plot
             var graphic = game.add.graphics(0,0);
             this.generatePlotGraphic(i,graphic);
            
            //Generate the sprite for the graphic
             var currentSprite = game.add.sprite(0, this.Y_OFFSET_OF_GRAPH, graphic.generateTexture());
             
             this.sprites.push(currentSprite);
             //currentSprite.anchor.set(0.5);
             //currentSprite.scale.setTo(3, 3);
             graphic.destroy();
            
        }
        
         this.sprites[0].visible = false;
        this.sprites[1].visible = false;
       

    },

    render: function () {
        //xPosition++;
        for(var i = 0; i < this.numCompanies; i++){
            this.sprites[i].x-= this.GAME_SPEED;
            
            
        }
        this.advancedPixels+=this.GAME_SPEED;
        
        
        this.surfer.y = this.getHeightOfSurfer() + this.Y_OFFSET_OF_GRAPH -this.SURFER_DIMENSIONS + 3;
        //If goes down, sprite goes up 3 pixels (half of grosor of the linea)
        if(this.surferSlope < 0){
            this.surfer.y -=4;
        }
        
        console.log(this.surferSlope)
        
       
       
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
          ini_x = i*this.PIXELS_PER_POINT;
          fin_x = (i+1)*this.PIXELS_PER_POINT;


          // set a fill and line style
          graphObject.beginFill(0xFF3300);
          graphObject.lineStyle(6, 0xffd900*(i+1), 1);

          // draw a shape
          graphObject.moveTo(ini_x, ini_y);
          graphObject.lineTo(fin_x, fin_y);
    }
    },
    getHeightOfSurfer: function(){
        
        var relativeAdvancedPixels = this.advancedPixels + this.X_OFFSET_OF_SURFER + this.SURFER_DIMENSIONS;
        var initialPoint = Math.floor(relativeAdvancedPixels/this.PIXELS_PER_POINT);
        var finalPoint = initialPoint + 1;
        var pixelsAdvancedSinceFirstPoint = (relativeAdvancedPixels - initialPoint*this.PIXELS_PER_POINT);
        var percentageAdvancedSinceFirstPoint = (pixelsAdvancedSinceFirstPoint/this.PIXELS_PER_POINT);
        var heightDifference = this.all_companies_stock[2][finalPoint] - this.all_companies_stock[2][initialPoint];
        this.surferSlope = -(heightDifference); //So if goes down, slope is negative
        var heightRightNow = this.all_companies_stock[2][initialPoint] + percentageAdvancedSinceFirstPoint*heightDifference;
        return heightRightNow;
    }

};

    
    
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
  game.state.add('Game',SurfGame,true);
  
  

};
