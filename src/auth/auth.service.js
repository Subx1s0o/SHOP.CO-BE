import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateCreateUserDTO from "../dto/createUser.dto.js";
import validateLoginUserDTO from "../dto/loginUser.dto.js";
import User from "../models/user.model.js";
export class AuthService {
  #generateToken(user, secret, expiresIn) {
    return jwt.sign({ sub: user._id, email: user.email }, secret, {
      expiresIn,
    });
  }

  async register(authDto) {
    try {
      await validateCreateUserDTO(authDto);

      const hashedPassword = await bcrypt.hash(authDto.password, 10);
      const userData = {
        ...authDto,
        password: hashedPassword,
      };

      const user = await User.findOne({ email: authDto.email });

      if (user) {
        throw { statusCode: 409, message: "User already exists" };
      }

      const newUser = await User.create(userData);

      const accessToken = this.#generateToken(
        newUser,
        process.env.JWT_ACCESS_SECRET,
        "30m"
      );
      const refreshToken = this.#generateToken(
        newUser,
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );

      return {
        message: "User created successfully",
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto) {
    try {
      await validateLoginUserDTO(loginDto);

      const user = await User.findOne({ email: loginDto.email });

      if (!user) {
        throw { statusCode: 401, message: "Invalid Email or password " };
      }

      const decoded = await bcrypt.compare(loginDto.password, user.password);

      if (!decoded) {
        throw { statusCode: 401, message: "Invalid Email or password " };
      }

      const accessToken = this.#generateToken(
        user,
        process.env.JWT_ACCESS_SECRET,
        "30m"
      );
      const refreshToken = this.#generateToken(
        user,
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );

      return {
        message: "User Logged successfully",
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      throw error;
    }
  }
}
