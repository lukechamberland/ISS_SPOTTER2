// iss.js

const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(`Error retrieving IP address: ${error}`, null);

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when attempting to fetch IP: ${body}`;
      callback(Error(message), null);
      return;
    }

    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) return callback(`Error retrieving coordinates: ${error}`, null);

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching coordinates: ${body}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;
    const coords = {
      lat: latitude,
      lon: longitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const { lat, lon } = coords;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  request(url, (error, response, body) => {
    if (error) return callback(`Error retrieving flyover times: ${error}`, null);

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when attempting to fetch flyover times: ${body}`;
      callback(Error(message), null);
      return;
    }

    const flyover = JSON.parse(body).response;
    callback(null, flyover);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyover) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyover);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };