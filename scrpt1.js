const cValues = async () => {
  // Perform asynchronous operations, e.g., fetching data
  const response = await fetch('https://api.example.com'); //
  const data = await response.json(); //

  // Return the data; it will be wrapped in a Promise
  return data;
};

async function getCValues() {
  // ... asynchronous operations ...
  const response = await fetch('https://api.example.com');
  const data = await response.json();
  return data;
}

async function processValues() {
  console.log("Fetching data...");
  // Use 'await' to pause execution until the promise is resolved
  const values = await cValues(); // Assumes cValues is defined as above
  console.log("Received values:", values);
}

processValues();

cValues().then(values => {
  console.log("Received values:", values);
}).catch(error => {
  console.error("An error occurred:", error); // Use try-catch for errors with async/await
});