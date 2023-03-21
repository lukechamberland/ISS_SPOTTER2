//index

// Import the nextISSTimesForMyLocation function from the './iss' module.
const { nextISSTimesForMyLocation } = require('./iss');

// Define a function to log the pass times for the ISS.
const logISSPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    // Convert the UNIX timestamp to a human-readable date.
    const passDate = new Date(0);
    passDate.setUTCSeconds(pass.risetime);

    // Log the date and duration of the ISS pass.
    const passDuration = pass.duration;
    console.log(`Next pass at ${passDate} for ${passDuration} seconds!`);
  }
};

// Call the nextISSTimesForMyLocation function to retrieve the pass times.
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("error occured", error);
  }
  // Log the pass times.
  logISSPassTimes(passTimes);
});