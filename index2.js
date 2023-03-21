//index2

const { nextISSTimesForMyLocation, printPassTimes } = require('./iss_promised');

// Calling the function

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  }).catch((error) => {
    console.log("Error occured: " + error.message);
  });