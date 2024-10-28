import { TagFields } from "../types";

export const calculateNewReleaseTag = (
  oldReleaseTag: string | null | undefined
) => {
  const oldTagData = oldReleaseTag ? parseTag(oldReleaseTag) : null;
  const newData = calculateNewTagData(oldTagData);
  return formatTag(newData);
};
const parseTag = (tag: string) => {
  const regex = /(\d{4})\.(\d{2})\.(\d{2})-(\d+)/;
  const [, ...parts1] = tag.match(regex) || [];
  const parts = parts1.map((part) => parseInt(part, 10));
  const [year, month, day, itr] = parts;
  return { year, month, day, itr };
};

const calculateNewTagData = (oldTagData: TagFields | null) => {
  let newItr = 1;
  const curDate = new Date();
  const cur = {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    day: curDate.getDate(),
  };
  if (
    oldTagData &&
    !(
      oldTagData.year !== cur.year ||
      oldTagData.month !== cur.month ||
      oldTagData.day !== cur.day
    )
  ) {
    newItr = oldTagData.itr + 1;
  }
  return {
    year: cur.year,
    month: cur.month,
    day: cur.day,
    itr: newItr,
  };
};
const formatTag = (tagFields: TagFields) => {
  const pad = (num: number, count: number) =>
    num.toString().padStart(count, "0");
  const { year, month, day, itr } = tagFields;
  return `${pad(year, 4)}.${pad(month, 2)}.${pad(day, 2)}-${itr}`;
};
