const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BASE_URL, PORT } = process.env;

class Utils {
  async createToken(payload) {
    return await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, savedPassword) {
    return await bcrypt.compare(password, savedPassword);
  }
}

module.exports = Utils;
