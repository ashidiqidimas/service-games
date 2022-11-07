const userService = require("../user.service");
const bcrypt = require("bcrypt");
const userRepo = require("../user.repository");
const { faker } = require("@faker-js/faker");

bcrypt.hash = jest.fn().mockReturnValue("thisIsAHashedPassword");

const testData = {
  fullname: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe("user.service.test", () => {
  describe("test createUser", () => {
    it("should create new user", async () => {
      const result = await userService.createUser(testData);

      expect(bcrypt.hash).toBeCalledWith(testData.password, 10);
      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe("thisIsAHashedPassword");

      testData.id = result.userId;
    });
  });

  describe("test getUserProfile", () => {
    it("should return the user for the given id", async () => {
      const result = await userService.getUserProfile({ userId: testData.id });

      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe("thisIsAHashedPassword");
    });
  });

  describe("test updateUser", () => {
    it("should update the user with the given values", async () => {
      const newData = {
        userId: testData.id,
        fullname: faker.name.fullName(),
        email: faker.internet.password(),
        password: faker.internet.password(),
      };

      await userService.updateUser(newData);
      const result = await userRepo.getUserProfile({ userId: newData.userId });

      expect(bcrypt.hash).toBeCalledWith(newData.password, 10);
      expect(result.fullname).toBe(newData.fullname);
      expect(result.email).toBe(newData.email);
      expect(result.password).toBe("thisIsAHashedPassword");
    });
  });

  describe("test resetPassword", () => {
    it("should update the user with the given values", async () => {
      const newData = {
        userId: testData.id,
        password: faker.internet.password(),
      };

      await userService.resetPassword(newData);
      const result = await userRepo.getUserProfile({ userId: newData.userId });

      expect(bcrypt.hash).toBeCalledWith(newData.password, 10);
      expect(result.password).toBe("thisIsAHashedPassword");
    });
  });
});