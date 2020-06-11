import { Request, Response } from "express";
import knex from "../database/connection";
import { compareHash, generateHash, generateToken } from '../models/user'

class UserController {
  
  async show (req: Request, res: Response) {
    const {
      email,
      password
    } = req.query;

    const [ user ] = await knex("users")
      .select('*')
      .where('email', String(email))
      .distinct();
    
    if (!user) res.status(400).json({ error: "User not found" });
    
    const response = await compareHash(user.password, String(password));
    if (!response) res.status(400).json({ error: "Invalid password" });

    return res.json({
      user,
      token: generateToken(Number(user.id))
    });
  }

  async create (req: Request, res: Response) {
    const { 
      name,
      email,
      password
    } = req.body;

    const verify = await knex("users")
      .where('email', String(email))
      .distinct();
    
    if (verify.length > 0) res.status(400).json({ error: "User already exists" });
    

    const [ id ] = await knex("users").insert({
      email,
      name,
      password: await generateHash(password)
    });

    if (!id) return res.status(400).json({ error: "User registration failed" });

    return res.json({ id });
  };

}

export default UserController;
// const authMiddleware = require("../middlewares/auth");

// const User = mongoose.model("User");

// router.use(authMiddleware);

// router.get("/me", async (req, res) => {
//   try {
//     const { userId } = req;

//     const user = await User.findById(userId);

//     return res.json({ user });
//   } catch (err) {
//     return res.status(400).json({ error: "Can't get user information" });
//   }
// });

// module.exports = router;
