const collection = [
  "collection.persistent",
  "group",
  "index",
  "item",
  "selector",
];

const computed = ["computed.tracker", "index"];

const event = ["event.job", "event.observer", "index"];

const integrations = ["index", "integration"];

const logger = ["index"];

const runtime = ["index", "observer", "runtime.job"];

const state = [
  "index",
  "state.observer",
  "state.persistent",
  "state.runtime.job",
];

const storages = ["index", "persistent", "storage"];

module.exports = [
  ...collection.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/collection/${name}.ts`,
    language: "TypeScript",
  })),

  ...computed.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/computed/${name}.ts`,
    language: "TypeScript",
  })),

  ...event.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/event/${name}.ts`,
    language: "TypeScript",
  })),

  ...integrations.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/integrations/${name}.ts`,
    language: "TypeScript",
  })),

  ...logger.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/logger/${name}.ts`,
    language: "TypeScript",
  })),

  ...runtime.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/runtime/${name}.ts`,
    language: "TypeScript",
  })),

  ...state.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/state/${name}.ts`,
    language: "TypeScript",
  })),

  ...storages.map((name) => ({
    name,
    project: "Agile TS",
    projectUrl: "https://github.com/agile-ts/agile",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/agile-ts/agile/master/LICENSE",
    source: `https://raw.githubusercontent.com/agile-ts/agile/master/packages/core/src/storages/${name}.ts`,
    language: "TypeScript",
  })),
];
