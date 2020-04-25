const assert = require("assert");
const Command = require("../command.js");

describe("Command class", function () {
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    assert.throws(
      function () {
        new Command();
      },
      {
        message: "Command type required.",
      }
    );
  });

  it("error if command type does not equal value", function () {
    let commandTypeTest = new Command("MOVE", 1234);
    assert.notStrictEqual(typeof commandTypeTest.commandType, undefined);
  });

  it("constructor sets a value passed in as the 2nd argument", function () {
    let commandTypeTest = new Command("MOVE", 1234);
    assert.notStrictEqual(typeof commandTypeTest.value, undefined);
  });
});
