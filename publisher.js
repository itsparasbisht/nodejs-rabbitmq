const amqp = require("amqplib");
require("dotenv").config();

const msg = { number: process.argv[2] };
console.log(process.argv);
async function connect() {
  try {
    const connection = await amqp.connect(process.env.AMQP_HOST);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log("Job sent successfully");
    channel.close();
  } catch (error) {
    console.log(error);
  }
}

connect();
