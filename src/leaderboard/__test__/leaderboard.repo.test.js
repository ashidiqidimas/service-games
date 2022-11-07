const leaderboardRepo = require("../leaderboard.repository");

describe("leaderboard.repo.test", () => {
  describe("getAllUser", () => {
    it("should return an array of users", async () => {
      const result = await leaderboardRepo.getAllUser();

      expect(result).toBeInstanceOf(Array);
    });

    it("should have less than 11 of elements", async function () {
      const result = await leaderboardRepo.getAllUser();

      expect(result.length).toBeLessThanOrEqual(10);
    });
  });
});
