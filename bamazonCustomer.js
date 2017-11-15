var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "wiggler12!",
  database: "Bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

//Prevents user from entering negative numbers
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole number that is not zero.';
  }
}

function promptUserPurchase() {

  // Prompts user to select item
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'Please enter the ID of the item you would like to purchase.',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input) {

    var item = input.item_id;
    var quantity = input.quantity;

    // Confirms the given item ID has sufficient quantity
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, {item_id: item}, function(err, data) {
      if (err) throw err;

      // If user selects an invalid item ID, data array will be empty
      // console.log('data = ' + JSON.stringify(data));

      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayInventory();

      } else {
        var productData = data[0];

        // If the quantity requested by the user is in stock
        if (quantity <= productData.stock_quantity) {
          console.log('Placing order....');

          // Constructs the updating query string
          var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

          // Updates inventory
          connection.query(updateQueryStr, function(err, data) {
            if (err) throw err;

            console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
            console.log('Thank you for shopping with us!');
            console.log("\n---------------------------------------------------------------------\n");

            // Ends database connection
            connection.end();
          });
        } else {
          console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
          console.log('Please modify your order.');
          console.log("\n---------------------------------------------------------------------\n");

          displayInventory();
        }
      }
    });
});
}
// Displays current inventory from database and outputs it to console
function displayInventory() {

  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log('Existing Inventory: ');
    console.log('...................\n');

    var strOut = '';
    for (var i = 0; i < data.length; i++) {
      strOut = '';
      strOut += 'Item ID: ' + data[i].item_id + '  //  ';
      strOut += 'Product Name: ' + data[i].product_name + '  //  ';
      strOut += 'Department: ' + data[i].department_name + '  //  ';
      strOut += 'Price: $' + data[i].price + '\n';

      console.log(strOut);
    }

      console.log("--------------------------------------------------------\n");

      //Prompt the user for item/quantity they would like to purchase
      promptUserPurchase();
  });
}

//executes main application logic
function startBamazon() {

  // Display the available inventory
  displayInventory();
}

startBamazon();
