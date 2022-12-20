import {networkInterfaces } from "os";

console.log(networkInterfaces()["이더넷"][1].address)