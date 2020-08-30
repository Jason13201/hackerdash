const Discord = require("discord.js");
const AsciiTable = require("ascii-table");
const chrono = require("chrono-node");
const config = require("./config.json");
const { news, hackathons } = require("./hacks");

const client = new Discord.Client();

client.once("ready", () => {
  console.log(`${client.user.tag} is online :)`);
});

const people = [
  {
    name: "Chris#4392",
    timezone: "GMT-0430",
    skills: "I'm a game developer that's well-versed in Unity and Pygame.",
  },
  {
    name: "PoopDeLaScoop#7482",
    timezone: "GMT+0530",
    skills: "Octocat winner that does graphic design and has some experience with discord-py ;)",
  },
];

const events = [];

client.on("message", message => {
  if (message.content === "!ping") {
    message.channel.send("Heya!");
  }
  if (message.content === "!hackathons") {
    message.channel
      .send(
        "```" +
          hackathons.map((hackathon, index) => `${index + 1}. ${hackathon.name}`).join("\n") +
          "```\nChoose your option:"
      )
      .then(() => {
        message.channel
          .awaitMessages(
            response => !isNaN(response.content) && 1 <= response.content && response.content <= 10,
            {
              max: 1,
              time: 30000,
              errors: ["time"],
            }
          )
          .then(collected => {
            const idx = collected.first().content - 1;
            const embed = new Discord.MessageEmbed()
              .setTitle(hackathons[idx].name)
              .setURL(hackathons[idx].link)
              .setColor("#add8e6")
              .setDescription(hackathons[idx].desc)
              .setAuthor("HackerDash", client.user.avatarURL())
              .setThumbnail(hackathons[idx].image)
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch(collected => {});
      });
  }
  if (message.content === "!news") {
    message.channel
      .send(
        "```" +
          news.map((newss, index) => `${index + 1}. ${newss.name}`).join("\n") +
          "```\nChoose your option:"
      )
      .then(() => {
        message.channel
          .awaitMessages(
            response => !isNaN(response.content) && 1 <= response.content && response.content <= 10,
            {
              max: 1,
              time: 30000,
              errors: ["time"],
            }
          )
          .then(collected => {
            const idx = collected.first().content - 1;
            const embed = new Discord.MessageEmbed()
              .setTitle(news[idx].name)
              .setURL(news[idx].link)
              .setColor("#add8e6")
              .setDescription(news[idx].desc)
              .setAuthor("HackerDash", client.user.avatarURL())
              .setThumbnail(news[idx].image)
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch(collected => {});
      });
  }
  if (message.content === "!findpeople") {
    const table = AsciiTable.factory({
      title: "** Available Hackers **",
      heading: ["Discord ID", "Timezone", "Skills"],
      rows: people.map(elem => [elem.name, elem.timezone, elem.skills]),
    });
    message.channel.send("```\n" + table.toString() + "```");
  }
  if (message.content === "!lft") {
    message.channel.send(
      "Great to hear that you want to join a team! What's your timezone and skills?"
    );
    message.channel
      .awaitMessages(response => response.author.id == message.author.id, {
        max: 1,
        time: 30000,
        errors: ["time"],
      })
      .then(collected => {
        const reply = collected.first();
        const pieces = reply.content.split(" ");
        reply.channel.send("Successfully added to the list :+1:");
        people.push({ name: reply.author.tag, timezone: pieces.shift(), skills: pieces.join(" ") });
      });
  }
  if (message.content.startsWith("!remind")) {
    const args = message.content.split(" ");
    args.shift();
    message.channel.send("When is the event?");
    message.channel
      .awaitMessages(response => response.author.id == message.author.id, {
        max: 1,
        time: 30000,
        errors: ["time"],
      })
      .then(collected => {
        const reply = collected.first();
        const eventDate = chrono.parseDate(reply.content);
        events.push({ name: args.join(" "), time: eventDate });
        message.channel.send(
          `Great! I will remind you to attend **${args.join(
            " "
          )}** at **${eventDate.toLocaleString()}** :smile:`
        );
        console.log(events);
        setTimeout(() => {
          message.channel.send(`The **${args.join(" ")}** event starts now, get ready to join!`);
        }, eventDate - Date.now());
      });
  }
});

client.login(config.token);
