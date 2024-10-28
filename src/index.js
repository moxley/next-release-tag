var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

import { getInput, setFailed, setOutput } from "@actions/core";
import { fetchLatestReleaseTag } from "./services/githubService";
import { calculateNewReleaseTag } from "./services/releaseService";

const generateNextReleaseTag = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const tagPrefix = getInput("tag_prefix");
      const tagTemplate = getInput("tag_template");
      const previousTagOverride = getInput("previous_tag");
      const oldReleaseTag =
        previousTagOverride || (yield fetchLatestReleaseTag());
      const newReleaseTag = calculateNewReleaseTag(
        tagPrefix,
        tagTemplate,
        oldReleaseTag
      );
      console.log(`Previous Release Tag: ${oldReleaseTag}`);
      console.log(`New Release Tag: ${newReleaseTag}`);
      setOutput("prev_release_tag", oldReleaseTag);
      setOutput("next_release_tag", newReleaseTag);
    } catch (error) {
      if (error instanceof Error) setFailed(error.message);
    }
  });
generateNextReleaseTag();
