const Command = require("./command.js");
const Message = require("./message.js");
const Rover = require("./rover.js");

let rover = new Rover(98382); // Passes 98382 as the rover's position.
//console.log(rover);

let commands = [new Command("STATUS_CHECK")];
let message = new Message("Mover Rover to 1234", commands);

let response = rover.receiveMessage(message);

//console.log(response);
let myRover = new Rover(1234);
let myCommands = [new Command("MOVE", 12345), new Command("MOVE", 435345)];
let myMessage = new Message("Test Name", myCommands);

let testRover = myRover.receiveMessage(myMessage);

console.log(testRover);
