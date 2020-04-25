const Message = require("./message");
const Command = require("./command.js");

class Rover {
  constructor(position) {
    this.position = position;
    if (!position) {
      throw Error("Position Required.");
    }

    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  //message contains name, list of commands
  receiveMessage(message) {
    let complete = "completed: true";
    let fail = "completed: false";
    let unknown = "unknown command";
    let returnObject = {
      name: message.name,
      results: [],
    };

    // loop through message object command array, if message command at i === to
    for (let i = 0; i < message.commands.length; i++) {
      if (message.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          returnObject.results.push(fail);
        } else {
          this.position = message.commands[i].value;
          returnObject.results.push(this.position);
          returnObject.results.push(complete);
        }
      }
      if (message.commands[i].commandType === "STATUS_CHECK") {
        returnObject.results.push(
          this.position,
          this.mode,
          this.generatorWatts
        );
      } else if (message.commands[i].commandType === "MODE_CHANGE") {
        this.mode = message.commands[i].value;
        returnObject.results.push(complete);
      }
    }
    return returnObject;
  }
}

module.exports = Rover;
