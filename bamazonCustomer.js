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
    connection.query("SELECT * FROM bamazon.products", function(err, result, fields) {
        if (err) throw err;
        console.log("------------------------------------------------------------------------------------------------------------------------")
        for (i=0; i < result.length; i++) {
            var item_id = result[i].item_id;
            var product_name = result[i].product_name;
            var department_name = result[i].department_name;
            var price = result[i].price;
            var stock_quantity = result[i].stock_quantity;
            var item_info = {"ID": parseInt(item_id), "Product": product_name, "Department": department_name, "Price": parseFloat(price), "Stock": parseInt(stock_quantity)};
            productsArray.push(item_info);
            console.log("Item ID#: " + item_info.ID + " | Product: " + item_info.Product + " | Department: " + item_info.Department + " | Price: " + item_info.Price + " | Stock: " + item_info.Stock)
            
        }
        console.log("------------------------------------------------------------------------------------------------------------------------")
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
            console.log("------------------------------------------------------------------------------------------------------------------------")
            for (i=0; i < result.length; i++) {
                var item_id = result[i].item_id;
                var product_name = result[i].product_name;
                var department_name = result[i].department_name;
                var price = result[i].price;
                var stock_quantity = result[i].stock_quantity;
                var item_info = {"ID": parseInt(item_id), "Product": product_name, "Department": department_name, "Price": parseFloat(price), "Stock": parseInt(stock_quantity)};
                productsArray.push(item_info);
                // console.log(item_info);
                console.log("Item ID#: " + item_info.ID + " | Product: " + item_info.Product + " | Department: " + item_info.Department + " | Price: " + item_info.Price + " | Stock: " + item_info.Stock)
                
            }
            console.log("------------------------------------------------------------------------------------------------------------------------")
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
                    var item_info = productsArray[i];
                    console.log("*******************************************************************************************************************")
                    console.log("---------------------------------------------------YOU SELECTED----------------------------------------------------")
                    console.log("Item ID#: " + item_info.ID + " | Product: " + item_info.Product + " | Department: " + item_info.Department + " | Price: " + item_info.Price + " | Stock: " + item_info.Stock)
                    console.log("*******************************************************************************************************************")
                    itemPurchase(item_info);
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
                    console.log("Insufficient quantity: There is not enough of the item you selected in stock.");
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
        console.log("Item ID: " + res.affectedRows + " stock has been updated")
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
