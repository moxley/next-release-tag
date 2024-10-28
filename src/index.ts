import { getInput, setFailed, setOutput } from "@actions/core";
import { fetchLatestReleaseTag } from "./services/githubService";
import { calculateNewReleaseTag } from "./services/releaseService";

const generateNextReleaseTag = async (): Promise<void> => {
  try {
    const previousTagOverride = getInput("previous_tag");

    const oldReleaseTag =
      previousTagOverride || (await fetchLatestReleaseTag());
    const newReleaseTag = calculateNewReleaseTag(oldReleaseTag);

    console.log(`Previous Release Tag: ${oldReleaseTag}`);
    console.log(`New Release Tag: ${newReleaseTag}`);

    setOutput("prev_release_tag", oldReleaseTag);
    setOutput("next_release_tag", newReleaseTag);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
};

generateNextReleaseTag();
