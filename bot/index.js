const Discord = require("discord.js");
const config = require("./config.json");
const { news, hackathons } = require("./hacks");

const client = new Discord.Client();

client.once("ready", () => {
  console.log(`${client.user.tag} is online :)`);
});

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
});

client.login(config.token);
