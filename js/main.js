window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  var display_array = []

  var companies_stocks = []

  function init_companies_stocks(companies_stocks) {
    var num_companies = 5;
    var num_point_per_company = 150;

    // for each company with stock data
    for (i = 0; i < num_companies; i++) {
      // fill its stock array with points
    }
  }

  function init_display_array(array) {
    var max_elems = 150;
    for (i = 0; i < max_elems; i++) {
      var new_y = Math.floor((Math.random() * 100) + 1);  // between 1 and 100
      array.push(new_y);
    }
  }

  // fill array with random data
  init_display_array(display_array);

  function display_chart() {
    // dibujar una línea entre cada una de las parejas de puntos del display_array
    for (i = 0; i < display_array.length - 1; i++) {
      ini_y = display_array[i];
      fin_y = display_array[i+1];
      ini_x = i*5;
      fin_x = (i+1)*5;

      var graphics = game.add.graphics(5, 200);

      // set a fill and line style
      graphics.beginFill(0xFF3300);
      graphics.lineStyle(2, 0xffd900, 1);

      // draw a shape
      graphics.moveTo(ini_x, ini_y);
      graphics.lineTo(fin_x, fin_y);
    }
  }

  function preload () {

    game.load.image('logo', 'phaser.png');

  }

  function create () {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    // ---

    /*var graphics = game.add.graphics(100, 100);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);

    // draw a shape
    graphics.moveTo(50,50);
    graphics.lineTo(250, 50);

    for (i = 0; i < display_array.length; i++) {
    var chart_box = game.add.graphics(0, 0);
    chart_box.beginFill(0xFF0000, 1);
    chart_box.drawCircle(i*10, display_array[i], 2)
    }*/
    //display_chart();
  }

  function update() {
    // pop leftmost element in the graphics array
    // push new element into the graphics array (from the right side)

    display_array.shift();
    var new_y = Math.floor((Math.random() * 100) + 1);  // between 1 and 100
    display_array.push(new_y);
  }

  function render() {
    game.world.removeAll()
    // paint again the array
    display_chart();
    console.log("render!");
  }

};
