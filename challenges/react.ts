const reactChallenges = [
  "BadMapPolyfill", // GOOD
  "IsSomeRendererActing", // GOOD
  "React", // maybe too long?
  "ReactBaseClasses", // maybe too long?
  "ReactChildren", // maybe too long?
  "ReactContext", // maybe too long?
  "ReactCreateRef", // GOOD
  "ReactCurrentBatchConfig",
  "ReactCurrentOwner",
  "ReactDebugCurrentFrame", // maybe too long?
  "ReactElement", // maybe too long?
  "ReactElementValidator", // maybe too long?
  "ReactForwardRef",
  "ReactHooks", // maybe too long?
  "ReactLazy", // maybe too long?
  "ReactMemo",
  "ReactMutableSource", // maybe too long? maybe good
  "ReactNoopUpdateQueue",
  "ReactSharedInternals", // GOOD
  "ReactStartTransition",
];

const reactDomClientChallenges = [
  "DOMAccessibilityRoles",
  "DOMPropertyOperations",
  "ReactDOM",
  "ReactDOMComponent",
  "ReactDOMComponentTree",
  "ReactDOMEventHandle",
  "ReactDOMHostConfig",
  "ReactDOMInput",
  "ReactDOMLegacy",
  "ReactDOMOption",
  "ReactDOMRoot",
  "ReactDOMSelect",
  "ReactDOMSelection",
  "ReactDOMTextarea",
  "ReactInputSelection",
  "ToStringValue",
  "getActiveElement",
  "getNodeForCharacterOffset",
  "inputValueTracking",
  "setInnerHTML",
  "setTextContent",
  "validateDOMNesting",
];

const reactDomSharedChallenges = [
  "CSSProperty",
  "CSSPropertyOperations",
  "CSSShorthandProperty",
  "DOMNamespaces",
  "DOMProperty",
  "HTMLNodeType",
  "ReactControlledValuePropTypes",
  "ReactDOMInvalidARIAHook",
  "ReactDOMNullInputValuePropHook",
  "ReactDOMTypes",
  "ReactDOMUnknownPropertyHook",
  "assertValidProps",
  "checkReact",
  "createMicrosoftUnsafeLocalFunction",
  "dangerousStyleValue",
  "hyphenateStyleName",
  "isCustomComponent",
  "omittedCloseTags",
  "possibleStandardNames",
  "sanitizeURL",
  "validAriaProperties",
  "voidElementTags",
  "warnValidStyle",
];

const redux = [
  "index",
  "createStore",
  "compose",
  "combineReducers",
  "bindActionCreators",
  "applyMiddleware",
];

const reactScheduler = [
  "TracingSubscriptions",
  "Tracing",
  "SchedulerProfiling",
  "SchedulerPriorities",
  "SchedulerMinHeap",
  "SchedulerFeatureFlags",
];

const reactClient = [
  "ReactFlightClient",
  "ReactFlightClientHostConfig",
  "ReactFlightClientHostConfigBrowser",
  "ReactFlightClientHostConfigStream",
  "ReactFlightClientHostConfigNoStream",
  "ReactFlightClientStream",
];

const reactServer = [
  "ReactFizzServer",
  "ReactFlightServer",
  "ReactFlightServerBundlerConfigCustom",
  "ReactFlightServerConfig",
  "ReactFlightServerConfigStream",
  "ReactServerFormatConfig",
  "ReactServerStreamConfig",
  "ReactServerStreamConfigBrowser",
  "ReactServerStreamConfigNode",
];

export default [
  {
    name: "createThunkMiddleware",
    project: "Redux Thunk",
    projectUrl: "https://github.com/reduxjs/redux-thunk",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/reduxjs/redux-thunk/master/LICENSE.md",
    source:
      "https://raw.githubusercontent.com/reduxjs/redux-thunk/master/src/index.js",
    language: "JavaScript",
  },
  {
    name: "ReactCacheOld",
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source:
      "https://raw.githubusercontent.com/facebook/react/master/packages/react-cache/src/ReactCacheOld.js",
    language: "JavaScript",
  },

  {
    name: "ReactFetchNode",
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source:
      "https://raw.githubusercontent.com/facebook/react/master/packages/react-fetch/src/ReactFetchNode.js",
    language: "JavaScript",
  },

  ...reactServer.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/react-server/src/${name}.js`,
    language: "JavaScript",
  })),

  ...reactClient.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/react-client/src/${name}.js`,
    language: "JavaScript",
  })),
  ...reactScheduler.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/scheduler/src/${name}.js`,
    language: "JavaScript",
  })),
  ...redux.map((name) => ({
    name,
    project: "Redux",
    projectUrl: "https://github.com/reduxjs/redux",
    license: "MIT",
    licenseUrl:
      "https://raw.githubusercontent.com/reduxjs/redux/master/LICENSE.md",
    source: `https://raw.githubusercontent.com/reduxjs/redux/master/src/${name}.ts`,
    language: "TypeScript",
  })),
  ...reactChallenges.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/react/src/${name}.js`,
    language: "JavaScript",
  })),
  ...reactDomClientChallenges.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/react-dom/src/client/${name}.js`,
    language: "JavaScript",
  })),
  ...reactDomSharedChallenges.map((name) => ({
    name,
    project: "React",
    projectUrl: "https://github.com/facebook/react",
    license: "MIT",
    licenseUrl: "https://github.com/facebook/react/blob/master/LICENSE",
    source: `https://raw.githubusercontent.com/facebook/react/master/packages/react-dom/src/shared/${name}.js`,
    language: "JavaScript",
  })),
];
