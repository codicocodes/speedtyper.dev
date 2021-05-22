const react = require("./react");
const agile = require("./agile");
const jotling = require("./jotling");
const lodash = require("./lodash");
const narutoql = require("./narutoql");
const sfss = require("./sfss");
const pdfSigner = require("./pdf-signer");
const theAlgorithms = require("./the-algorithms");
const unirestJava = require("./unirest-java");
const mixin = require("./mixin");
// const calc = require("./calc");
// const wordokuCsp = require("./wordoku_csp.js");
const configr = require("./configr");

module.exports = [
  ...lodash,
  ...jotling,
  ...agile,
  ...react,
  ...narutoql,
  ...sfss,
  ...pdfSigner,
  ...theAlgorithms,
  ...unirestJava,
  ...mixin,
  ...configr,
  // ...calc,
  // ...wordokuCsp
];
