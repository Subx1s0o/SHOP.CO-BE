import { AuthService } from "./auth.service.js";

const authService = new AuthService();

const createUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ ...error });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ ...error });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export default { createUser, loginUser };
