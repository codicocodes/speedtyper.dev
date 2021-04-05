export default [
  {
    name: "createExpressServer.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/createExpressServer.ts",
  },
  {
    name: "createGraphqlServer.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/createGraphqlServer.ts",
  },
  {
    name: "village.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/database/seeders/village.ts",
  },
  {
    name: "cleanup-clan-image.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/database/seeders/cleanup-clan-image.ts",
  },
  {
    name: "index.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/database/seeders/index.ts",
  },
  {
    name: "character-resolver",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/graphql/character/character-resolver.ts",
  },
  {
    name: "clan-resolver",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/graphql/clan/clan-resolver.ts",
  },
  {
    name: "village-resolver",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/graphql/village/village-resolver.ts",
  },

  {
    name: "useDebounceValue.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/client/hooks/useDebouncedValue.ts",
  },
  {
    name: "useIntersectionObserver.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/client/hooks/useIntersectionObserver.ts",
  },
  {
    name: "useKeyPress.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/client/hooks/useKeyPress.ts",
  },

  {
    name: "useWindowSize.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/client/hooks/useWindowSize.ts",
  },

  {
    name: "truncateString.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/client/shared/utils/truncateString.ts",
  },
  {
    name: "errors.ts",
    source:
      "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/src/server/utils/errors.ts",
  },
].map((file) => ({
  ...file,
  project: "NarutoQL",
  projectUrl: "https://github.com/bautistaaa/narutoQL",
  licenseUrl:
    "https://raw.githubusercontent.com/bautistaaa/narutoQL/main/LICENSE",
  license: "MIT",
  language: "JavaScript",
}));
