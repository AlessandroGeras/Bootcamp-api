import {Router} from "express";
import {StatusCodes} from "http-status-codes";
import User from "../Database/UserModel.js";
import bcrypt from "bcrypt";

const usersroute = Router();

//New user register route
usersroute.post("/users", async(req, res) => {
   const requestusername = req.body.username;
   const password = await bcrypt.hash(req.body.password,10);
   req.body.password = password;
   const user = await User.findOne({where: {username:requestusername}})
   
   //Check if user exists
   if(user){
      res.status(StatusCodes.FORBIDDEN).send({"Erro": "Usuário Existente"});
   }
   //If user not exists, create new user
   else{
    await User.create(req.body);
    res.status(StatusCodes.CREATED).send({"Sucesso": "Usuário Criado"});
   }
})


usersroute.put("/users", async(req, res) => {
   const requestusername = req.body.username;
   const update = {};

   if(req.body.css===true){
      update.CSS=req.body.css;
   }
   if(req.body.js===true){
      update.JS=req.body.js;
   }
   if(req.body.reactjs===true){
      update.ReactJS=req.body.reactjs;
   }
   if(req.body.sql===true){
      update.SQL=req.body.sql;
   }
   const setUpdate = {CSS:update.CSS,JS:update.JS,ReactJS:update.ReactJS,SQL:update.SQL};

   const updated = await User.update(setUpdate, {
      where: {
         username:requestusername
      }
    });  

   const user = await User.findOne({where: {username:requestusername}})

   return res.status(StatusCodes.ACCEPTED).send({"Sucesso":"Alterações Modificadas","css":user.CSS,"js":user.JS,"reactjs":user.ReactJS,"sql":user.SQL});
   }
)


export default usersroute;