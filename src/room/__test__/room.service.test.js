const roomService = require("../room.service");
const roomRepo = require("../room.repo");

const testData = {
  roomName: "room test",
  hostUserId: 1,
};

describe("room.service.test", () => {
  describe('test createRoom', () => {
    it('should create a new room', async () => {
      const result = await roomRepo.createRoom(testData);

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);
    });
  });
});
