import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

export const fetchLatestReleaseTag = async () => {
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
