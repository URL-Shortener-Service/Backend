const models = require("../../models");

const { generateToken } = require("../helpers/jwt");
const { successResponse, errorHelper } = require("../helpers/response");

module.exports = {
  async createUser(req, res) {
    try {
      const user = await models.User.create(req.body);
      const token = await generateToken(user);
      return successResponse(res, 201, { msg: "Usercreated", token });
    } catch (error) {
      return errorHelper(res, 500, error.message);
    }
  },
  async loginUser(req, res, next) {
    try {
      const user = await models.User.findOne({ email: req.body.email }).select(
        "+password"
      );

      if (!user) {
        return errorHelper(res, 401, "Invalid credentials");
      }
      const confirm = user.comparePassword(req.body.password);
      if (!confirm) {
        return errorHelper(res, 401, "Invalid credentials");
      }
      const token = await generateToken(user);

      return successResponse(res, 200, {
        message: "successfully logged in",
        token
      });
    } catch (error) {
      return errorHelper(res, 500, error.message);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { user } = req;
      const { password } = req.body;
      if (password) {
        req.body.password = bcrypt.hashSync(password, 10);
      }
      const updatedUser =  merge(user, req.body);
      user.save();
      return successResponse(res, 200, updatedUser);
    } catch (error) {
      return next({ message: "Error updating user profile" });
    }
  }
};
