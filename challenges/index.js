const react = require("./react");
const agile = require("./agile");
const jotling = require("./jotling");
const lodash = require("./lodash");
const narutoql = require("./narutoql");
const sfss = require("./sfss");
const pdfSigner = require("./pdf-signer");
const calc = require("./calc");

module.exports = [
  ...lodash,
  ...jotling,
  ...agile,
  ...react,
  ...narutoql,
  ...sfss,
  ...pdfSigner,
  ...calc,
];
