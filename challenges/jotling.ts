const contexts = [
  "leftNavContext",
  "settingsContext",
  "statsContext",
  "findReplaceContext",
  "decoratorContext",
];

const editorNav = ["ColorPickerPopper", "InlineStyleButton"];

export default [
  {
    name: "contextUtils",
    project: "Jotling",
    projectUrl: "https://github.com/autophytes/jotling",
    license: "CC BY-NC-ND 4.0",
    licenseUrl:
      "https://raw.githubusercontent.com/autophytes/jotling/master/LICENSE",
    source:
      "https://raw.githubusercontent.com/autophytes/jotling/master/src/utils/contextUtils.js",
    language: "JavaScript",
  },
  {
    name: "draftUtils",
    project: "Jotling",
    projectUrl: "https://github.com/autophytes/jotling",
    license: "CC BY-NC-ND 4.0",
    licenseUrl:
      "https://raw.githubusercontent.com/autophytes/jotling/master/LICENSE",
    source:
      "https://raw.githubusercontent.com/autophytes/jotling/master/src/utils/draftUtils.js",
    language: "JavaScript",
  },
  {
    name: "utils",
    project: "Jotling",
    projectUrl: "https://github.com/autophytes/jotling",
    license: "CC BY-NC-ND 4.0",
    licenseUrl:
      "https://raw.githubusercontent.com/autophytes/jotling/master/LICENSE",
    source:
      "https://raw.githubusercontent.com/autophytes/jotling/master/src/utils/utils.js",
    language: "JavaScript",
  },
  ...editorNav.map((name) => ({
    name,
    project: "Jotling",
    projectUrl: "https://github.com/autophytes/jotling",
    license: "CC BY-NC-ND 4.0",
    licenseUrl:
      "https://raw.githubusercontent.com/autophytes/jotling/master/LICENSE",
    source: `https://raw.githubusercontent.com/autophytes/jotling/master/src/components/navs/editor-nav/${name}.jsx`,
    language: "JavaScript",
  })),
  ...contexts.map((name) => ({
    name,
    project: "Jotling",
    projectUrl: "https://github.com/autophytes/jotling",
    license: "CC BY-NC-ND 4.0",
    licenseUrl:
      "https://raw.githubusercontent.com/autophytes/jotling/master/LICENSE",
    source: `https://raw.githubusercontent.com/autophytes/jotling/master/src/contexts/${name}.js`,
    language: "JavaScript",
  })),
];
