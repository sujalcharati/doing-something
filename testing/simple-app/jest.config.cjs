const { createDefaultEsmPreset } = require("ts-jest");

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  ...createDefaultEsmPreset({
    tsconfig: "tsconfig.json",
  }),
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
