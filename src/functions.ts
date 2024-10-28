import { setFailed, setOutput } from "@actions/core";
import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { TagFields } from "./types";

export const generateNextReleaseTag = async (): Promise<void> => {
  try {
    const oldReleaseTag = await fetchLatestReleaseTag();
    const newReleaseTag = calculateNewReleaseTag(oldReleaseTag);

    console.log(`Previous Release Tag (3): ${oldReleaseTag}`);
    console.log(`New Release Tag: ${newReleaseTag}`);

    setOutput("prev_release_tag", oldReleaseTag);
    setOutput("next_release_tag", newReleaseTag);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
};

const fetchLatestReleaseTag = async () => {
  console.log("Fetching latest release tag for this repository (2)");
  try {
    const githubToken = getInput("github_token", { required: true });
    const octokit = getOctokit(githubToken);
    const { owner, repo } = context.repo;
    // Fetch only latest tag
    const response = await octokit.rest.repos.listReleases({
      owner,
      repo,
      page: 1,
      per_page: 1,
    });
    const names = response.data.map((release) => release.name);
    console.log("names", names);
    const releases = response.data.filter((release) =>
      release.name?.match(/^\d+\.\d+\.\d+-\d+$/)
    );
    return releases.at(0)?.name;
  } catch (e) {
    console.error("Error while fetching tags list for this repository", e);
    throw e;
  }
};

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
