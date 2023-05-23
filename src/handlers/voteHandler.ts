import { type Embed, EmbedBuilder } from "discord.js";
import {
  addVote,
  getMostVoted,
  getName,
  getUserVotes,
  isMutliVote,
  removeVote,
  addPeopleVoted,
  removePeopleVoted,
} from "../utils/pollEmbedFields";

export function handleVote(embed: Embed, userId: string, buttonLabel: string) {
  const fields = embed.fields;
  const multiVote = isMutliVote(fields);
  const prevUserVotes = getUserVotes(fields, userId);

  let footerText = embed.footer?.text ?? "";

  const fieldsWithVote = fields.map((field) => {
    if (getName(field) !== buttonLabel) return field;

    if (prevUserVotes.length > 0) {
      if (prevUserVotes.includes(field)) {
        if (prevUserVotes.length === 1) {
          footerText = removePeopleVoted(footerText);
        }

        return removeVote(field, userId);
      }

      if (!multiVote) {
        throw new Error("You can only vote once!");
      }
    } else {
      footerText = addPeopleVoted(footerText);
    }

    return addVote(field, userId);
  });

  const mostVoted = getMostVoted(fieldsWithVote);
  fieldsWithVote[0] = {
    name: fieldsWithVote[0].name,
    value:
      mostVoted.length > 0
        ? mostVoted.map((field) => field.name).join("\n")
        : "-",
    inline: true,
  };

  return new EmbedBuilder(embed.data)
    .setFields(fieldsWithVote)
    .setFooter({ text: footerText });
}
