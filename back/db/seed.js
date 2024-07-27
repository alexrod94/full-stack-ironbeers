const mongoose = require("mongoose");
const Beer = require("../models/Beer.model");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ironbeers").then((x) => {
  const dbName = x.connections[0].name;
  console.log(`Connected to Mongo! Database name: "${dbName}"`);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Define fake beers
  const beers = [
    {
      image_url:
        "https://education-team-2020.s3.eu-west-1.amazonaws.com/api_assets/ironbeers/buzz.webp",
      name: "Buzz",
      tagline: "A Real Bitter Experience.",
      first_brewed: "09/2007",
      description:
        "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
      attenuation_level: 75,
      brewers_tips:
        "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
      contributed_by: "Sam Mason <samjbmason>",
      expireAt: new Date("2024-07-27T07:00:16.502Z"),
    },
    {
      image_url: "https://images.punkapi.com/v2/keg.png",
      name: "Punk IPA",
      tagline: "Post Modern Classic. Spiky. Tropical. Hoppy.",
      first_brewed: "04/2007",
      description:
        "Punk IPA is a hoppy, tropical modern classic IPA brewed with American hops. Bursts of citrus and tropical fruits.",
      attenuation_level: 85,
      brewers_tips:
        "Ferment at a low temperature for a crisp and refreshing finish.",
      contributed_by: "James Watt <james@brewdog.com>",
      expireAt: new Date("2024-10-10T07:00:16.502Z"),
    },
  ];

  // Insert fake beers into the database
  Beer.insertMany(beers)
    .then(() => {
      console.log("Fake beers added successfully");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error adding fake beers:", err);
      mongoose.connection.close();
    });
});
