window.onload = function() {
    
    var SurfGame = function () {

        this.bmd = null;

        this.points = {
            'x': [ 32, 128, 256, 384, 512, 608 ],
            'y': [ 240, 240, 240, 240, 240, 240 ]
        };

    };
    
    
 SurfGame.prototype = {

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
    
    preload: function(){
         game.load.image('logo', 'phaser.png');
         game.load.image('main-buttons', 'assets/sprites/main-buttons.png');
        
    },
    
    create: function () {
        // Add main buttons
        this.pic = game.add.sprite(0, this.h-this.heightButton, 'main-buttons');
        this.pic.scale.set(1);

        this.button_1_text = game.add.text(this.widthButton/4, this.h-this.heightButton/1.5, "APPL", { font: "54px Arial", fill: "#ffffff" });
        this.button_2_text = game.add.text(this.heightButton+this.widthButton/1.7, this.h-this.heightButton/1.5, "GOOGL", { font: "54px Arial", fill: "#ffffff" });
        this.button_3_text = game.add.text(2*this.heightButton+this.widthButton, this.h-this.heightButton/1.5, "YHOO", { font: "54px Arial", fill: "#ffffff" }); 

        game.input.onTap.add(this.onTap, this);

        //Put the logo on the background
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        
        
        init_all_companies_stocks(this.all_companies_stock,this.numCompanies);
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
                console.log(choise);
                return(choise);
            } else {
                console.log("Tap out of menu: " + pointer.clientX + " - " + pointer.clientY);
            }
    }

};

    
    
  var game = new Phaser.Game(961, 1550, Phaser.AUTO, '');
  game.state.add('Game',SurfGame,true);
  
  

};
