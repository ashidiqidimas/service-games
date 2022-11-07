const {
  createUser,
  getUser,
  getUserEmail,
  updatePassword,
  getUserProfile,
  updateUser,
} = require("../user.repository");
const { faker } = require("@faker-js/faker");

const testData = {
  fullname: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe("UserRepoTest", () => {
  describe("test createUser", () => {
    it("should create new user", async () => {
      const result = await createUser(testData);

      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe(testData.password);

      testData.id = result.userId;
    });

    it("should return error", async function () {
      await createUser(testData);
      const result = await createUser(testData);

      expect(result.message).toBeTruthy();
    });
  });

  describe("test getUser", () => {
    it("should get user for the given id", async () => {
      // user with id 1 was already created in 'should create new user' test
      const result = await getUser({ userId: testData.id });

      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe(testData.password);
    });
  });

  describe("test getUserEmail", () => {
    it("should ", async () => {
      const result = await getUserEmail({ email: testData.email });

      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe(testData.password);
    });
  });

  describe("test getUserProfile", () => {
    it("should return a user object for the given id", async () => {
      // user with id 1 was already created in 'should create new user' test
      const result = await getUserProfile({ userId: testData.id });

      expect(result.fullname).toBe(testData.fullname);
      expect(result.email).toBe(testData.email);
      expect(result.password).toBe(testData.password);
    });
  });

  describe("test updateUser", () => {
    it("should update the user with the given values", async () => {
      const user = await getUser({ userId: testData.id });
      const newValues = {
        userId: user.userId,
        fullname: "new name",
        email: "new@email.com",
        password: "n3wPassword!",
      };

      await updateUser(newValues);
      const updatedUser = await getUser({ userId: newValues.userId });

      expect(updatedUser.fullname).toBe(newValues.fullname);
      expect(updatedUser.email).toBe(newValues.email);
      expect(updatedUser.password).toBe(newValues.password);
    });
  });

  describe("test updatePassword", () => {
    it("should update the user with the password", async () => {
      const user = await getUser({ userId: testData.id });
      const newPassword = "n3wPassword!";

      await updatePassword({ userId: user.userId, password: newPassword });
      const updatedUser = await getUser({ userId: user.userId });

      expect(updatedUser.password).toBe(newPassword);
    });
  });
});
