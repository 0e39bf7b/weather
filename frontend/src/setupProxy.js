module.exports = function(app) {
  app.get('/measurements.json', (req, res) => {
    res.json([
      {
        temperature: 2,
        humidity: 70,
        pressure: 730,
        timestamp: 1607260145,
      },
      {
        temperature: 3.15,
        humidity: 82,
        pressure: 742,
        timestamp: 1607281586,
      },
      {
        temperature: 1,
        humidity: 90,
        pressure: 743,
        timestamp: 1607283586,
      },
    ]);
  });
};
