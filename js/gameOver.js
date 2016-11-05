var gameOver = function(game){}
 
gameOver.prototype = {
	init: function(score){
		if(!score){
			var points = localStorage.getItem('points');
			alert("You scored: " + points);
		} else {
			alert("You scored: " + score);
		}
		
	},
  	create: function(){
  		var w = 961, h = 1550;
  		var gameOverTitle = this.game.add.text((w/2)-150, h/4, "GAME OVER", { font: "54px Arial", fill: "#ffffff" });
		//gameOverTitle.anchor.setTo(0.5,0.5);

		var points = localStorage.getItem('points');
		var gameOverPoints = this.game.add.text((w/2)-150, (h/4)+100, "Points: " + points, { font: "54px Arial", fill: "#ffffff" });

		var playButton = this.game.add.button((w/2)-150, (h/4)+250,"try-again",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		//this.game.state.start("Game");
		window.location.href = 'http://' + window.location.host + '/index.html';
	}
}