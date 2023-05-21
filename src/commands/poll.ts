import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import type Command from "../types/command";

const PollCommand: Command = {
  command: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask")
        .setMinLength(1)
        .setMaxLength(256)
        .setRequired(true),
    )
    .addBooleanOption((option) =>
      option
        .setName("multi-vote")
        .setDescription("Enable or disable multiple votes per user")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("option-1")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("option-2")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("option-3")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-4")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-5")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-6")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-7")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-8")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-9")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-10")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-11")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-12")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-13")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-14")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("option-15")
        .setDescription("Option to vote on")
        .setMinLength(1)
        .setMaxLength(80)
        .setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
  execute: async (interaction) => {
    try {
      if (!interaction.inGuild()) {
        await interaction.reply({
          content: "This command can only be used in a server.",
          ephemeral: true,
        });
        return;
      }

      // check for duplicate option values
      const uniqueOptions = new Set(
        interaction.options.data.map((option) => option.value),
      );
      if (uniqueOptions.size !== interaction.options.data.length) {
        await interaction.reply({
          content: "You cannot have duplicate options.",
          ephemeral: true,
        });
        return;
      }

      // create embed
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(
          `**${
            interaction.options.get("question", true).value?.toString() ?? ""
          }**`,
        )
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL() ?? undefined,
        })
        .setDescription(
          "*Vote by clicking the buttons below.\n(remove the vote by clicking the button again)*",
        )
        .setFooter({
          text: `Presented by ${interaction.client.user.username}`,
          iconURL: interaction.client.user.avatarURL() ?? undefined,
        })
        .setTimestamp()
        .addFields([
          {
            name: "__Most voted__",
            value: "-",
            inline: true,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: true,
          },
          {
            name: "__Multi-Vote__",
            value:
              (interaction.options.get("multi-vote", true).value?.toString() ??
                "false") === "true"
                ? "Enabled"
                : "Disabled",
            inline: true,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          },
        ])
        .addFields(
          interaction.options.data.slice(2).map((option) => ({
            name: `**${option.value?.toString() ?? ""}**\n\`0 Votes\``,
            value: "-",
            inline: true,
          })),
        );

      // create action rows
      const actionRows: ActionRowBuilder<ButtonBuilder>[] = [];
      const options = interaction.options.data.slice(2);
      const rowEntries = 3;
      for (let i = 0; i < options.length; i += rowEntries) {
        actionRows.push(
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            ...options.slice(i, i + rowEntries).map((option) =>
              new ButtonBuilder()
                .setCustomId(option.name)
                .setStyle(ButtonStyle.Primary)
                .setLabel(option.value?.toString() ?? ""),
            ),
          ),
        );
      }

      await interaction.reply({
        embeds: [embed],
        components: actionRows,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default PollCommand;
