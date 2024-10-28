import { calculateNewReleaseTag } from "../functions";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it("previous release was yesterday", () => {
  const today = new Date("2022-10-13T12:00:00Z");
  jest.setSystemTime(today);
  expect(calculateNewReleaseTag("2022.10.12-2")).toBe("2022.10.13-1");
});

it("add to previous release on same day", () => {
  const today = new Date("2022-10-13T12:00:00Z");
  jest.setSystemTime(today);
  expect(calculateNewReleaseTag("2022.10.13-2")).toBe("2022.10.13-3");
});

it("when no previous release exists", () => {
  const today = new Date("2022-10-13T12:00:00Z");
  jest.setSystemTime(today);
  expect(calculateNewReleaseTag(null)).toBe("2022.10.13-1");
});
