const fs = require("fs");
const challenges = require("./challenges");

fs.writeFile("index.json", JSON.stringify(challenges), "utf8", () => {
  console.log("successful :)");
});
