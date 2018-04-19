var mysql = require ('mysql');
var inquirer = require('inquirer');

var managerActions = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
var productsArray = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});

function updateData () {
    productsArray = [];
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
        }
        
        managerAction();
});
}

function connectDatabase() {
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

});
    productsArray = [];
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
    
            
        }
        
        managerAction();
});

}

function managerAction () {
    
    console.log("---------------------------------------------------MANAGER VIEW----------------------------------------------------")
    inquirer.prompt([
      
        {
            type: "list",
            name: "actionSelect",
            message: "Select action: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
          ]).then(function(input) {

                if (input.actionSelect === "View Products for Sale") {
                    viewProducts();
                }

                else if (input.actionSelect === "View Low Inventory") {
                    checkInventory();
                }

                else if (input.actionSelect === "Add to Inventory") {
                    addInventory();
                }

                else {
                    newProductPrompt();
                }
              
        });

}


function viewProducts() {
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
        managerAction();
});

}

function checkInventory() {
    console.log("------------------------------------------------------------------------------------------------------------------------")
    for (i=0; i < productsArray.length; i++) {
        item_info = productsArray[i];
        if (item_info.Stock < 5) {
            console.log("Item ID#: " + item_info.ID + " | Product: " + item_info.Product + " | Department: " + item_info.Department + " | Price: " + item_info.Price + " | Stock: " + item_info.Stock)
        }
    }
    console.log("------------------------------------------------------------------------------------------------------------------------")
    managerAction();
}


function addInventory() {
    inquirer.prompt([
      
        {
            type: "input",
            name: "inventorySelect",
            message: "Enter the item id# of the item you would like to add inventory to: ",
        },
        {
            type: "input",
            name: "addInventory",
            message: "How much inventory would you like to add?: ",
        }
          ]).then(function(input) {
            var selectedItem = parseInt(input.inventorySelect);
            var itemExist = false;
            for (i=0; i < productsArray.length; i++) {
                if (productsArray[i].ID != selectedItem) {
                    continue;
                }

                else if (productsArray[i].ID === selectedItem) {
                    itemExist = true;
                }
            }
            if (itemExist === false) {
                console.log("Invalid item. Please select an existing product id number.")
                addInventory();
            }

            else if (itemExist === true) {
                var actualIndex = selectedItem - 1;
                var inventoryAdd = parseInt(input.addInventory);
                var newStockQuantity = inventoryAdd + parseInt(productsArray[actualIndex].Stock);
                var query = connection.query (
                    "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: newStockQuantity
                    },
                    {
                      item_id: selectedItem
                    }
                  ],
                  function(err, res) {
                    updateData();
                });


            }
                  
    });
}


function newProductPrompt() {
    console.log("Inserting a new product...\n");

    inquirer.prompt([
      
        {
            type: "input",
            name: "name",
            message: "Enter product name: ",
        }, 
        {
            type: "input",
            name: "department",
            message: "Enter product department name: ",
        }, 
        {
            type: "input",
            name: "price",
            message: "Enter product price: ",
        }, 
        {
            type: "input",
            name: "stock",
            message: "Enter stock quantity: ",
        }, 
          ]).then(function(input) {

            addProduct(input);
    
    });
}

function addProduct(new_item) {
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: new_item.name,
            department_name: new_item.department,
            price: new_item.price,
            stock_quantity: new_item.stock
        },
        function(err, res) {
            console.log("Product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            updateData();
            }
        );
}

connectDatabase();