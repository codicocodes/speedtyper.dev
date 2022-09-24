/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [".d.ts", ".js"],
  globalSetup: "./test-utils/globalSetup.ts",
  globalTeardown: "./test-utils/globalTeardown.ts",
  setupFilesAfterEnv: ["./test-utils/setupFile.ts"],
};
