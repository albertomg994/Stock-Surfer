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
