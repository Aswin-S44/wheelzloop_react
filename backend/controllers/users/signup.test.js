const User = require("../../models/users/schema");
const { createSecretToken } = require("../../utils/helpers");
const { Signup } = require("./signup");

jest.mock("../../models/users/schema");
jest.mock("../../utils/helpers");

describe("Signup Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        phoneNumber: "1234567890",
        password: "password123",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a message if the user already exists", async () => {
    User.findOne.mockResolvedValue({ email: "test@example.com" });

    await Signup(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: "test@example.com" }, { phoneNumber: "1234567890" }],
    });
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
  });

  it("should create a new user and return a success message", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: "userId123", ...req.body });
    createSecretToken.mockReturnValue("secretToken123");

    await Signup(req, res, next);

    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(createSecretToken).toHaveBeenCalledWith("userId123");
    expect(res.cookie).toHaveBeenCalledWith("token", "secretToken123", {
      withCredentials: true,
      httpOnly: false,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User signed in successfully",
      success: true,
      user: { _id: "userId123", ...req.body },
    });
  });
});
