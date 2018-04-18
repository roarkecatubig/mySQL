var mysql = require ('mysql');
var inquirer = require('inquirer');

var productsArray = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});

function updateDisplay() {
    productsArray = [];
    connection.query("SELECT * FROM products", function(err, result, fields) {
        if (err) throw err;
        for (i=0; i < result.length; i++) {
            var item_id = result[i].item_id;
            var product_name = result[i].product_name;
            var department_name = result[i].department_name;
            var price = result[i].price;
            var stock_quantity = result[i].stock_quantity;
            var item_info = {"ID": parseInt(item_id), "Product": product_name, "Department": department_name, "Price": parseFloat(price), "Stock": parseInt(stock_quantity)};
            productsArray.push(item_info);
            console.log("------------------------------------------------------------------------------------------------------------------------")
            console.log(item_info);
            
        }
        itemSelect();
    });
}

function connectAndDisplay() {

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
        connection.query("SELECT * FROM bamazon.products", function(err, result, fields) {
            if (err) throw err;
            for (i=0; i < result.length; i++) {
                var item_id = result[i].item_id;
                var product_name = result[i].product_name;
                var department_name = result[i].department_name;
                var price = result[i].price;
                var stock_quantity = result[i].stock_quantity;
                var item_info = {"ID": parseInt(item_id), "Product": product_name, "Department": department_name, "Price": parseFloat(price), "Stock": parseInt(stock_quantity)};
                productsArray.push(item_info);
                console.log("------------------------------------------------------------------------------------------------------------------------")
                console.log(item_info);
                
            }
            itemSelect();
            
        });

    });

}

function itemSelect() {
    inquirer.prompt([
      
        {
            type: "input",
            name: "itemSelect",
            message: "Enter the item ID # of the item you would like to purchase: ",
        }
          ]).then(function(input) {
          
            for (i=0; i < productsArray.length; i++) {

                if (parseInt(input.itemSelect) === productsArray[i].ID) {
                    var item = productsArray[i];
                    console.log("*******************************************************************************************************************")
                    console.log("----------------------------------------------------YOUR CART------------------------------------------------------")
                    console.log(item)
                    console.log("*******************************************************************************************************************")
                    itemPurchase(item);
                }
              
            }

        });
}

function itemPurchase(selectedItem) {
    var item = selectedItem;

    inquirer.prompt([
      
        {
            type: "input",
            name: "itemQuantity",
            message: "How much of the above item would you like to purchase?"
        }

          ]).then(function(input) {

            var itemQuantity = parseInt(input.itemQuantity);

                if (itemQuantity <= item.Stock) {

                    updateStock(item, itemQuantity)
                }

                else {
                    console.log("Insufficient quantity");
                    itemPurchase(item);
                }
              

        });

}

function updateStock (selectedItem, quantity) {
    var userQuantity = quantity;
    var item = selectedItem;
    var newStockQuantity = item.Stock - userQuantity;
    var userTotal = parseFloat(userQuantity * item.Price);
    var query = connection.query (
        "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newStockQuantity
        },
        {
          item_id: selectedItem.ID
        }
      ],
      function(err, res) {
        console.log(res.affectedRows)
        console.log("Order completed");
        console.log("Your total is: " + userTotal)
        buyMoreThings();
    });
};

function buyMoreThings() {
    inquirer.prompt([
      
        {
            type: "list",
            name: "shopMore",
            message: "Would you like to shop more Bamazon products",
            choices: ["Yes", "No"]
        }

          ]).then(function(input) {
   
            if (input.shopMore === "Yes") {

                updateDisplay();
            }

            else {
                connection.end()
                console.log("Thank you for shopping with Bamazon!");
            }
              

        });
}


connectAndDisplay();
