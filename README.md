# mySQL

Link to bamazon customer and manager view demo: https://drive.google.com/file/d/1S1JnmDYcOBG7dp121QaWBnzvhu9Q2Ujw/view?usp=sharing

Welcome to the Bamazon node.js and mySQL application. The exercise in node and mySQL will show how a user defined, local database can be built and manipulated in the form of an Amazon-like storefront. 

There are two components to this project: customer view and manger view. 

Customer View:
This view shows the basic utilization of mySQL in a node based application. When the bamazonCustomer.js file is initialized, the user will be shown all of the products for sale on bamazon. This data is pulled from a mySQL database with such product information as unique ID, name, department, price, and stock quantity. 

The user will then be prompted on what item they would like to purchase. After the user enters the appropriate unique ID # of the product they would like to purchase, they will be prompted with how much of that product they would like to purchase. If the user enters a number higher than the product's available stock, the user will be prompted with an "insufficient quantity" notification. Otherwise, there order should proceed by prompting them with the user's online total for purchasing that item (Note: Sales tax and multiple unique item checkout functionality is not included in this application). 

Manager View:
This view allows a user to manipulate the mySQL data in a similar way a manager would restock their available products. The manager view allows for four distinct actions:
  1. View Products for Sale
  2. View Low Inventory
  3. Add to Inventory
  4. Add New Product

1. View Products for Sale
Similar to the customer view, the user is shown all the available products for sale with each product's unique id, name, department, price, and stock quantity. The user is automatically prompted back with the four manager actions after viewing all products. 

2. View Low Inventory
Selecting this item allows the user to view all items with a stock quantity less than 5. The user is automatically prompted back with the four manager actions after viewing low inventory products. 

3. Add to Inventory
This action allows the user to increase the stock quantity of a given item by entering the item's appropriate unique id and then how much stock they would like to increase the available stock quantity number. The user is automatically prompted back with the four manager actions.

4. Add New Product
This action allows the user to add a new product to add to the items for sale. The user will then enter the product's name, department, price, and stock quantity. Once all of these fields ore completed, the user will be prompted that the item has been added. Selecting the "View Products for Sale" manager action will show that the item has successfully been added to the mySQL database. The user is automatically prompted back with the four manager actions.
