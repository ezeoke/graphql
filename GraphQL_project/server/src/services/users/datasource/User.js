const Author = require("../../../models/user/authors.schema");
const Base = require("../../../base");
const { AuthenticationError, Error } = require("apollo-server");

class User extends Base {
  // Mutations for the user OR Author
  async addAuthor(data) {
    const foundAuthor = await Author.findOne({ email: data.email });
    const foundUser = await Author.findOne({ username: data.username });

    if (foundAuthor) {
      throw new AuthenticationError(
        "A user with the given email already exits..."
      );
    } else if (foundUser)
      throw new AuthenticationError(
        "A user with the given username already exits..."
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
    const user = await Author.findOne({ email: data.email });

    const isValid = await this.comparePassword(data.password, user.password);

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
    }

    throw new AuthenticationError("This email or password is not correct");
  }

  async deleteAuthor(id) {
    const author = await Author.findByIdAndDelete({ _id: id });

    if (author) {
      return "author deleted successfully";
    } else {
      return "Cannot delete author";
    }
  }

  async verifyEmail(emailToken) {
    const isValid = await this.verifyEmailToken(emailToken);

    if (isValid) {
      const user = await User.findOne({ emailVerificationToken: emailToken });

      // if (user.isVerified)
      //   return "User is already verified, please continue to login...";

      if (user) {
        user.emailVerificationToken = null;
        // user.isVerified = true;

        await user.save();

        return "🚀 Verification Successful";
      }
    }
  }

  // Queries
  async getAuthor(id) {
    const foundUser = await Author.findOne({ _id: id });

    if (!foundUser) throw new Error("user with ID does not exist");

    return foundUser;
  }

  async getAuthors() {
    return await Author.find({});
  }

  async resendEmailVerification(id) {
    try {
      const foundUser = await User.findById(id);

      if (!foundUser) throw new Error("User not found");

      if (foundUser.isVerified)
        return "You have already been verified. Please continue to login...";

      foundUser.emailVerificationToken = await this.getEmailVerifierToken(id);

      await foundUser.save();

      const message = await this.getEVTTemplate(
        "Email Verification",
        foundUser.emailVerificationToken,
        "resend"
      );
      const subject = "Account Verification";

      this.sendMail(foundUser.email, message, subject);

      return "Your verification token has been sent successfully, Check your email to continue";
    } catch (e) {
      throw new Error("Ivalid post ID");
    }
  }

  /*
   * sendEmailVerification
   * @params: ID
   * returns: a string
   */
  async sendEmailVerification(id) {
    try {
      const foundUser = await User.findById(id);

      if (!foundUser) throw new Error("User not found");

      if (foundUser.isVerified) return "Already verified";

      foundUser.emailVerificationToken = await this.getEmailVerifierToken(id);

      await foundUser.save();

      const message = await this.getEVTTemplate(
        "Email Verification",
        foundUser.emailVerificationToken,
        "resend"
      );
      const subject = "Account Verification";

      this.sendMail(foundUser.email, message, subject);

      return "Your verification token has been sent successfully, Check your email to continue";
    } catch (e) {
      throw new Error("Ivalid post ID");
    }
  }
}

module.exports = User;
