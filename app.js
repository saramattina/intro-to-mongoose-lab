const mongoose = require("mongoose");
const db = require("./db/connection.js");
const Customer = require("./models/customer.js");
const prompt = require("prompt-sync")();

db();

console.log("Welcome to CRM! ");

const main = () => {
  const msg = `
  What would you like to do?
     1. Create a customer
     2. View all customers
     3. Update a customer
     4. Delete a customer
     5. Quit

  Number of action to run: `;

  const action = prompt(msg);
  queries(action);
};

const queries = (action) => {
  console.log(`You chose: ${action}`);

  if (action === "5") {
    console.log("exiting...");
    process.exit();
  }

  if (action === "1") {
    console.log("Creating a customer");
    const name = prompt("What is the name of your new customer? ");
    const age = prompt("What is the new customer's age? ");

    const createCustomer = async () => {
      const customer = await Customer.create({
        name: name,
        age: age,
      });

      return customer;
    };

    createCustomer();

    console.log(`Succesfully created a customer`);
    main();
  }

  if (action === "2") {
    console.log("Getting all customers");

    const getAllCustomers = async () => {
      const allCustomers = await Customer.find({});
      console.log(allCustomers);
      main();
    };

    getAllCustomers();
  }

  if (action === "3") {
    console.log("Let's update a customer!");

    const updateCustomer = async () => {
      const allCustomers = await Customer.find({});
      console.log(allCustomers);

      const customerById = prompt(
        "From the list above, what is the ID of the customer you would like to update? "
      );

      let newCustomerName = prompt("What is the customer's new name? ");
      let newCustomerAge = prompt("What is the customer's new age? ");

      const customerUpdated = await Customer.findByIdAndUpdate(customerById, {
        name: newCustomerName,
        age: newCustomerAge,
      });

      console.log("This customer has been updated!");
      main();
      return customerUpdated;
    };

    updateCustomer();
  }

  if (action === "4") {
    console.log("Let's remove a customer!");

   const customerDelete = async () => {
    const allCustomers = await Customer.find({});
    console.log(allCustomers);

    let customerId = prompt("From the list above, what is the ID of the customer you would like to remove? ");
    await Customer.findByIdAndDelete(customerId);

    console.log("Customer successfully removed!")
    main();
   };

   customerDelete();
  }

  if (action === "5") {
    console.log("exiting...");
    mongoose.connection.close();
  }
  
};

main();
