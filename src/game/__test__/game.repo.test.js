const gameRepo = require("../game.repo");
const userRepo = require("../../user/user.repository");
const { User } = require("../../database/models");
const { Room } = require("../../database/models");
const { faker } = require("@faker-js/faker");

describe("game.repo.test", () => {
  describe("test findUser", () => {
    it("should return a user", async () => {
      const testUserData = {
        userId: 1,
        fullname: faker.name.fullName(),
      };
      User.findByPk = jest.fn().mockReturnValue(testUserData);

      const result = await gameRepo.findUser(1);

      expect(result).toStrictEqual(testUserData);
    });
  });

  describe("test findRoom", () => {
    it("should return a user", async () => {
      const testRoomData = {
        id: 1,
        roomName: "something",
      };
      Room.findByPk = jest.fn().mockReturnValue(testRoomData);

      const result = await gameRepo.findRoom(1);

      expect(result).toStrictEqual(testRoomData);
    });
  });

  describe("test updateRoom", () => {
    Room.updateGame = jest.fn();

    it("should update the room with the given value and return the given room object", async () => {
      const result = await gameRepo.updateGame({}, 1);

      expect(result).toStrictEqual({ "id": 1, "roomName": "something" },
      );
    });

    it("should call Room.findByPk", function () {
      expect(Room.findByPk).toBeCalled();
    });
  });

  describe("test updateUserPoint", () => {
    it("should update the room with the given value and return the an array", async () => {
      User.update = jest.fn().mockReturnValue([0]);

      const result = await gameRepo.updateUserPoint({ userId: 1, addedPoint: 1 });

      expect(result).toStrictEqual([0]);
    });

    it("should call User.findByPk", function () {
      expect(User.update).toBeCalled();
    });
  });
});

