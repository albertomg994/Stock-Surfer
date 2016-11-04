/**
 * Displays charts of all companies stock values
 */
function display_all_companies_charts(game, all_companies_stocks) {
  for (var i = 0; i < all_companies_stocks.length; i++) {
    display_stocks_as_chart(game, all_companies_stocks[i]);
  }
}

/**
 * Displays chart of a single company stock values
 */
function display_stocks_as_chart(game, stock_values) {
  // dibujar una línea entre cada una de las parejas de puntos del display_array
  for (i = 0; i < stock_values.length - 1; i++) {
    ini_y = stock_values[i];
    fin_y = stock_values[i+1];
    ini_x = i*5;
    fin_x = (i+1)*5;

    var graphics = game.add.graphics(5, 200);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(2, 0xffd900*(i+10), 1);

    // draw a shape
    graphics.moveTo(ini_x, ini_y);
    graphics.lineTo(fin_x, fin_y);
  }
}
