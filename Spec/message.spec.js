const assert = require("assert");
const Message = require("../message.js");

describe("Message class", function () {
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    assert.throws(
      function () {
        new Message();
      },
      {
        message: "Name type required.",
      }
    );
  });

  it("throws error if a name is NOT passed into the constructor as the first parameter", function () {
    assert.notStrictEqual(typeof Message.name, "undefined");
  });

  it("contains a commands array passed into the constructor as 2nd argument", function () {
    let arr1 = ["Left", "Right", "Up", "Down"];
    let myMessage = new Message("Hello", arr1);
    assert.strictEqual(typeof myMessage.commands, "object");
  });
});
