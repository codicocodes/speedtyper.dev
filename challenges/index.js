const react = require("./react");
const agile = require("./agile");
const jotling = require("./jotling");
const lodash = require("./lodash");
const narutoql = require("./narutoql");
const sfss = require("./sfss");

module.exports = [
  ...lodash,
  ...jotling,
  ...agile,
  ...react,
  ...narutoql,
  ...sfss,
];
