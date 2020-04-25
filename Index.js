/*
  DON'T EDIT THIS FILE
  Click Run to run the tests.
  Add new tests and .js files.
*/
var Jasmine = require("jasmine");
// @ts-ignore
var jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: "spec",
  spec_files: ["**/*[sS]pec.js"],
});

jasmine.execute();
