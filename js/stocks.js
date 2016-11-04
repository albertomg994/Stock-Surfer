/**
 * Init all companies stocks arrays
 */
function init_all_companies_stocks(companies_stocks, num_companies) {
  for (var i = 0; i < num_companies; i++) {
    console.log("Generating stocks for company number " + i + " TOTAL COMPANIES: " + num_companies);
    var new_company_stocks = []
    init_company_stocks(new_company_stocks, 150);
    companies_stocks.push(new_company_stocks);
  }
}

/**
 * Fills an array representing a company's stock values with 'num_values' random
 * values
 */
function init_company_stocks(stock_values, num_values) {
  for (var i = 0; i < num_values; i++) {
    var new_value = generate_rand_int(1, 100);
    stock_values.push(new_value);
  }
}

/**
 *
 */
function update_all_companies_stocks(all_companies_stocks) {
  for (var i = 0; i < all_companies_stocks.length; i++) {
    all_companies_stocks[i].shift();  // pop leftmost element
    var new_y = generate_rand_int(1, 100);
    // push-right new element into the graphics array
    all_companies_stocks[i].push(new_y);
  }
}

/**
 *
 */
function update_company_stocks() {

}

/**
 * Generates random value between [floor, roof] to be pushed into the stocks arrays
 */
function generate_rand_int(floor, roof) {
  return Math.floor((Math.random() * 100) + 1);
}
