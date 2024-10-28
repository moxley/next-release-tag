import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const __awaiter =
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
        return result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

export const fetchLatestReleaseTag = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
      const githubToken = getInput("github_token", { required: true });
      const octokit = getOctokit(githubToken);
      const { owner, repo } = context.repo;
      // Fetch only latest tag
      const response = yield octokit.rest.repos.listTags({
        owner,
        repo,
        page: 1,
        per_page: 1,
      });
      return (_b =
        (_a = response.data) === null || _a === void 0 ? void 0 : _a.at(0)) ===
        null || _b === void 0
        ? void 0
        : _b.name;
    } catch (e) {
      console.error("Error while fetching tags list for this repository", e);
      throw e;
    }
  });
