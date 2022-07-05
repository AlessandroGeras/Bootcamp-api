import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../Database/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginroute = Router();

const secret = "geras";

//Login route
loginroute.post("/login", async (req, res) => {
  const requestusername = req.body.username;
  const requestpassword = req.body.password;
  const user = await User.findOne({ where: { username: requestusername } });

  //Password validation
  if (user) {
    const validation = await bcrypt.compare(requestpassword, user.password);

    //Send cookie with token
    if (validation) {
      const token = jwt.sign({ username: requestusername }, secret, {
        expiresIn: "60000",
      });
      res.cookie("access_token", token, {
        expires: new Date(Date.now() + 60 * 1000), //second min hour days year
        secure: true, // set to true if your using https or samesite is none
        httpOnly: true, // backend only
        sameSite: "none", // set to none for cross-request
      });
      res.json({
        Sucesso: "Usuário Logado",
        css: user.CSS,
        js: user.JS,
        reactjs: user.ReactJS,
        sql: user.SQL,
        Token: token,
      });
    } else {
      res.status(StatusCodes.FORBIDDEN).send({ Erro: "Senha Inválida" });
    }
  } else {
    res.status(StatusCodes.FORBIDDEN).send({ Erro: "Usuário Não Cadastrado" });
  }
});

export default loginroute;
