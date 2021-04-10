const source = [
  "file",
  "index",
];

module.exports = [
  ...source.map((name) => ({
    name,
    project: "PDF-Signer",
    projectUrl: "https://github.com/bennodev19/pdf-signer",
    license: "MIT",
    licenseUrl:
      "https://github.com/bennodev19/pdf-signer/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/bennodev19/pdf-signer/master/src/${name}.ts`,
    language: "TypeScript",
  })),
];
