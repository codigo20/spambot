const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

console.log("Ready to level up!");

client.on("message", async message => {
  const prefix = config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

  if (command === "spam") {
    var count = 1;
    var maxMessages = 100000; // Change based on how many messages you want sent

    function sendSpamMessage() {
      // You could modify this to send a random string from an array (ex. a quote), create a
      // random sentence by pulling words from a dictionary file, or to just send a random
      // arrangement of characters and integers. Doing something like this may help prevent
      // future bots from detecting that you sent a spam message.
      message.channel.send("This is spam message #" + count);

      if (count < maxMessages) {
        message.channel.send("/prune");
        count++;

        /* These numbers are good for if you want the messages to be deleted.
         * I've also noticed that Discord pauses for about 4 seconds after you send 9
         * messages in rapid succession, and this prevents that. I rarely have any spam
         * messages slip through unless there is a level up from mee6 or Tatsumaki. */
        let minTime = Math.ceil(2112);  // Rush RP1
        let maxTime = Math.floor(3779); // Arbitrary integer
        let timeToWait = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
        setTimeout(sendSpamMessage, timeToWait);
      } else { // Sends a message when completed. Else statement can be removed/modified without consequences
        message.channel.send("------------------");
        message.channel.send("I AM FINISHED!!!");
        message.channel.send("------------------");
      }
    }

    message.delete().catch(O_o=>{})
    sendSpamMessage();
  }

  if (command === "prune") {
    message.channel.fetchMessages()
    .then(messages => {
      let message_array = messages.array();
      message_array.length = 2;
      message_array.map(msg => msg.delete().catch(O_o => {}));
     });
  }
});

client.login(config.botToken);
