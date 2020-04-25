const assert = require("assert");
const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

describe("Message class", function () {
  it("throws error if position is NOT passed into constructor as the first parameter", function () {
    assert.throws(
      function () {
        new Rover();
      },
      {
        message: "Position Required.",
      }
    );
  });
});

describe("receiveMessage Function", function () {
  it("throws an error if response returned by receiveMessage does not contain the name of a message.", function () {
    let myRover = new Rover(1234);
    let myCommands = new Command("STATUS_CHECK");
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);
    expect(testRover.name).toMatch(myMessage.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let myRover = new Rover(1234);
    let myCommands = [new Command("MOVE", 12345), new Command("MOVE", 435345)];
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);

    expect(testRover.results.length).toEqual(4);
  });

  it("responds correctly to status check command", function () {
    let myRover = new Rover(1234);
    let myCommands = [new Command("STATUS_CHECK")];
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);

    expect(testRover.results[0]).toEqual(1234);
    expect(testRover.results[1]).toEqual("NORMAL");
    expect(testRover.results[2]).toEqual(110);
  });

  it("responds correctly to mode change command", function () {
    let myRover = new Rover(1234);
    let myCommands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);

    expect(testRover.results[0]).toEqual("completed: true");
    expect(myRover.mode).toEqual("LOW_POWER");
  });

  it("responds with false completed value when attempting to move in LOW POWER MODE", function () {
    let myRover = new Rover(1234);
    let myCommands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 11111),
    ];
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);

    expect(testRover.results[1]).toEqual("completed: false");
  });

  it("responds with position for MOVE COMMAND", function () {
    let myRover = new Rover(1234);
    let myCommands = [new Command("MOVE", 11111)];
    let myMessage = new Message("Test Name", myCommands);

    let testRover = myRover.receiveMessage(myMessage);

    expect(testRover.results[0]).toEqual(11111);
  });
});
