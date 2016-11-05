var gameOver = function(game){}
 
gameOver.prototype = {
	init: function(score){
		if(!score){
			var points = localStorage.getItem('points');
			//alert("You scored: " + points);
		} else {
			//alert("You scored: " + score);
		}
		
	},
  	create: function(){
      
  		var w = 961, h = 1550;
      
      this.game.add.tileSprite(0, 0, w, h, "back");
      
  		var gameOverTitle = this.game.add.text((w/2)-290, h/4, "CONGRATULATIONS!", { font: "54px Arial", fill: "#ffffff" });
		//gameOverTitle.anchor.setTo(0.5,0.5);

		var points = localStorage.getItem('points');
		var gameOverPoints = this.game.add.text((w/2)-270, (h/4)+100, "You surfed " + points + " points", { font: "54px Arial", fill: "#ffffff" });

		var playButton = this.game.add.button((w/2)-170, (h/4)+250,"try-again",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
    
    var rewards_message = this.game.add.text((w/2)-340, (h/4)+500, "You can spend this points in the shop", { font: "40px Arial", fill: "#ffffff" });
	},
	playTheGame: function(){
		//this.game.state.start("Game");
		window.location = '/index.html';
	}
}
