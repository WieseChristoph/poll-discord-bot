import type { APIEmbedField } from "discord.js";
import { getLineCount } from "./helpers";

export function getName(field: APIEmbedField) {
  return field.name.match(/(\d*\s-\s)(.*)/)?.[2];
}

export function isMutliVote(fields: APIEmbedField[]) {
  return fields[2].value === "Enabled";
}

export function getUserVotes(fields: APIEmbedField[], userId: string) {
  return fields.filter((field) => field.value.includes(userId));
}

export function getVoteCount(field: APIEmbedField) {
  return Number(field.name.match(/\d*/)?.[0]);
}

export function getMostVoted(fields: APIEmbedField[]) {
  return fields.slice(4).reduce((acc: APIEmbedField[], curr) => {
    if (acc.length === 0) {
      if (getLineCount(curr.value, "-") > 0) {
        return [curr];
      } else return acc;
    }
    if (getLineCount(acc[0].value, "-") === getLineCount(curr.value, "-"))
      return [...acc, curr];
    if (getLineCount(acc[0].value, "-") < getLineCount(curr.value, "-"))
      return [curr];
    return acc;
  }, []);
}

export function addVote(field: APIEmbedField, userId: string) {
  const currentVoteCount = getVoteCount(field);

  return {
    ...field,
    name: field.name.replace(
      new RegExp(currentVoteCount.toString()),
      (currentVoteCount + 1).toString(),
    ),
    value: `${field.value !== "-" ? `${field.value}\n` : ""}<@${userId}>`,
  };
}

export function removeVote(field: APIEmbedField, userId: string) {
  const currentVoteCount = getVoteCount(field);

  return {
    ...field,
    name: field.name.replace(
      new RegExp(currentVoteCount.toString()),
      (currentVoteCount - 1).toString(),
    ),
    value: field.value.replace(
      new RegExp(`(\\n)?<@${userId}>`),
      field.value === `<@${userId}>` ? "-" : "",
    ),
  };
}
