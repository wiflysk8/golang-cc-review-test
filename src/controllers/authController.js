import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users = [];

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ id: users.length + 1, username, password: hashedPassword });
  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ username: user.username }, "secret");
  res.status(200).json({ accessToken: token });
};

export const getUsers = async (req, res) => {
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  console.log(users);
  return res.status(200).json(usersWithoutPassword);
};

export const getUser = async (req, res) => {
  const { username } = req.params;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.status(200).json({ id: user.id, username: user.username });
};
