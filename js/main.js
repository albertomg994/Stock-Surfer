window.onload = function() {
    
    var SurfGame = function () {
        //Creamos el objeto surfGame

    };
    
    
 SurfGame.prototype = {


     
    //Constants
     PIXELS_PER_POINT: 50,
     GAME_SPEED: 1,
     Y_OFFSET_OF_GRAPH:400,
     SURFER_DIMENSIONS: 50,
     X_OFFSET_OF_SURFER:50,
     LINE_WIDTH: 10,
     COLORS: [0x0000FF,0x00FF40,0xFF0000], //Blue, Green and Red
     JUMP_HEIGHT: 600,
     
    // Measures and resolutions
    w: 961,
    h: 1550,
    heightButton: 200,
    widthButton: 327,

    // Text buttons variables
    button_1_text: undefined,
    button_2_text: undefined,
    button_3_text: undefined,

    //Variables of the game
    pic: undefined,
    stockValues: new Array(),
    numCompanies: 3,
    all_companies_stock: new Array(),
    graphPlot: undefined,
    sprites: new Array(),
    surfer:undefined,
    advancedPixels:0, //Number of pixels moved in the game,
    surferSlope:0,
    activePlot:0,
     jumping:false,
     blockedCounter: 6,
    
    preload: function(){
         game.load.image('logo', 'phaser.png');
         game.load.image('surfer','surfer.png');
         game.load.image('main-buttons', 'assets/sprites/main-buttons.png');
        
    },
    
    create: function () {
        // Add main buttons
        this.pic = game.add.sprite(0, this.h-this.heightButton, 'main-buttons');
        this.pic.scale.set(1);

        this.button_1_text = game.add.text(this.widthButton/4, this.h-this.heightButton/1.5, "APPL", { font: "54px Arial", fill: "#ffffff" });
        this.button_2_text = game.add.text(this.heightButton+this.widthButton/1.7, this.h-this.heightButton/1.5, "GOOGL", { font: "54px Arial", fill: "#ffffff" });
        this.button_3_text = game.add.text(2*this.heightButton+this.widthButton, this.h-this.heightButton/1.5, "MSFT", { font: "54px Arial", fill: "#ffffff" }); 

        game.input.onTap.add(this.onTap, this);

        //Put the logo on the background
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        

        game.time.events.add(500, this.substractCounter, this);
        //Init data of all stocks
        //init_all_companies_stocks(this.all_companies_stock,this.numCompanies);
        load_year_stock_values(this.all_companies_stock, true);  // load from JSON


        
        //Generate the sprite for the surfer
        this.surfer = game.add.sprite(this.X_OFFSET_OF_SURFER, 0, 'surfer');
        
         // physics
       this.physics.startSystem( Phaser.Physics.ARCADE );
        game.physics.arcade.enable([this.surfer]);
	    game.physics.arcade.gravity.y = 200;
        
        
        this.surfer.body.gravity.y = 500;

        this.surfer.body.allowGravity = false;
       
           
        //C
        
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
        
        
      
       

    },

    update: function(){
         //Only draw the active plot
        for(var j = 0; j < this.numCompanies; j++){
            if(j==this.activePlot){
                this.sprites[j].visible = true;
            }
            else{
                this.sprites[j].visible = false;
            }
        }
        
        for(var i = 0; i < this.numCompanies; i++){
            this.sprites[i].x-= this.GAME_SPEED;
            
            
        }
        this.advancedPixels+=this.GAME_SPEED;
        
        
        if(!this.jumping){
            this.surfer.y = this.getHeightOfSurfer() + this.Y_OFFSET_OF_GRAPH -this.SURFER_DIMENSIONS + 3;
            //If goes down, sprite goes up 3 pixels (half of grosor of the linea)
            if(this.surferSlope < 0){
                this.surfer.y -=this.LINE_WIDTH / 2 ;
            }
        }
        
        //Control end of jump
        if(this.jumping && this.surfer.body.velocity.y > 0){
            if(this.surfer.y >= this.getHeightOfSurfer() + this.Y_OFFSET_OF_GRAPH -this.SURFER_DIMENSIONS + 3){
                this.jumping = false;
                 this.surfer.body.allowGravity = false;
            }
        }
    },
    render: function () {
        //xPosition++;
        
       
        
        //console.log(this.surferSlope)
        
       
       
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
          graphObject.lineStyle(this.LINE_WIDTH, this.COLORS[j], 1);

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
        var heightDifference = this.all_companies_stock[this.activePlot][finalPoint] - this.all_companies_stock[this.activePlot][initialPoint];
        this.surferSlope = -(heightDifference); //So if goes down, slope is negative
        var heightRightNow = this.all_companies_stock[this.activePlot][initialPoint] + percentageAdvancedSinceFirstPoint*heightDifference;
        return heightRightNow;
    },
    changeButton: function(id, text){
            switch(id){
                case 1:
                    this.button_1_text.destroy();
                    this.button_1_text = game.add.text(this.widthButton/4, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                case 2:
                    this.button_2_text.destroy();
                    this.button_2_text = game.add.text(this.heightButton+this.widthButton/1.7, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                case 3:
                    this.button_3_text.destroy();
                    this.button_3_text = game.add.text(2*this.heightButton+this.widthButton, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                default: 
                    break;
            }
    },
    onTap: function(pointer, doubleTap) {
            // Calculate the corners of the menu
            var x1 = 0, x2 = this.w,
                y1 = this.h-this.heightButton, y2 = this.h;

            var limitButton2 = 327;
            var limitButton3 = 654;

            // Check if the click was inside the menu
            if(pointer.clientX > x1 && pointer.clientX < x2 && pointer.clientY > y1 && pointer.clientY < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choise;

                // Calculate the choice 
                if(pointer.clientX<limitButton2){
                    choise = 1;
                } else if(pointer.clientX>=limitButton2 && pointer.clientX<=limitButton3){
                    choise = 2;
                } else if(pointer.clientX>limitButton3){
                    choise = 3;
                } else {
                    choise = 0;
                }
                
                //Cambiar la activa
                this.activePlot = choise - 1;
                console.log(this.activePlot);
                return(choise);
            } else {
                
                if(!this.jumping){
                     this.surfer.body.allowGravity = true;
                 this.surfer.body.velocity.y = -this.JUMP_HEIGHT;
                 this.jumping = true;
                }
                
            }

    },
     substractCounter: function(){
         this.blockedCounter-= 0.5;
         game.time.events.add(500, this.substractCounter, this);
         console.log(this.blockedCounter);
     }

};

    
    
  var game = new Phaser.Game(961, 1550, Phaser.AUTO, '');
  game.state.add('Game',SurfGame,true);
  
  

};
