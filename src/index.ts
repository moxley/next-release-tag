import { setFailed, setOutput } from "@actions/core";
import { fetchLatestReleaseTag } from "./services/githubService";
import { calculateNewReleaseTag } from "./services/releaseService";

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

generateNextReleaseTag();
