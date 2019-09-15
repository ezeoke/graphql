const Author = require("../../../models/user/authors.schema");
const Base = require("../../../base");
const { AuthenticationError } = require("apollo-server");

class User extends Base {
  // Mutations for the user OR Author
  async addAuthor(data) {
    const foundAuthor = await Author.findOne({ email: data.email });

    if (foundAuthor)
      throw new AuthenticationError(
        "A user with the given email already exits..."
      );

    data.password = await this.hashPassword(data.password);

    const user = await Author.create(data);

    return user ? "User successfully created" : new Error(e.message);
  }

  async updateAuthor(data) {
    const updatedAuthor = {
      name: data.name,
      username: data.username,
      password: data.password
    };
    const authorUpdate = await Author.updateOne(
      { _id: data.authorId },
      updatedAuthor,
      { new: true }
    );

    if (authorUpdate.ok === 1) {
      console.log(authorUpdate);
      return "author updated";
    } else {
      ("cannot update author");
    }

    throw new AuthenticationError("This author does not exist");
  }

  async login(data) {
    const user = Author.findOne({ email: data.email });

    const isValid = await this.comparePassword(
      data.password,
      foundUser.password
    );

    if (isValid) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name
      };
      const token = await this.createToken(payload);
      return {
        code: 200,
        token
      };
    } else {
      throw new Error("Invalid Password");
    }
  }

  // Queries
  async getAuthor(id) {
    const foundUser = await Author.findById(id);

    if (!foundUser) throw new Error("user with ID does not exist");

    return foundUser;
  }

  async getAuthors() {
    return await Author.find({});
  }
}

module.exports = User;
