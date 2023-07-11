const amqp = require("amqplib");
require("dotenv").config();

async function connect() {
  try {
    const connection = await amqp.connect(process.env.AMQP_HOST);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(input);

      if (input.number == 10) {
        channel.ack(message);
      }
    });

    console.log("waiting for messages...");
  } catch (error) {
    console.log(error);
  }
}

connect();
