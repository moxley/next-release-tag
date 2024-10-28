import { setFailed, setOutput } from "@actions/core";
import { calculateNewReleaseTag } from "./services/releaseService";
import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const generateNextReleaseTag = async (): Promise<void> => {
  try {
    const oldReleaseTag = await fetchLatestReleaseTag();
    const newReleaseTag = calculateNewReleaseTag(oldReleaseTag);

    console.log(`Previous Release Tag (1): ${oldReleaseTag}`);
    console.log(`New Release Tag: ${newReleaseTag}`);

    setOutput("prev_release_tag", oldReleaseTag);
    setOutput("next_release_tag", newReleaseTag);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
};

const fetchLatestReleaseTag = async () => {
  console.log("Fetching latest release tag for this repository (1)");
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
    const releases = response.data.filter((release) =>
      release.name?.match(/^\d+\.\d+\.\d+-\d+$/)
    );
    return releases.at(0)?.name;
  } catch (e) {
    console.error("Error while fetching tags list for this repository", e);
    throw e;
  }
};

generateNextReleaseTag();
