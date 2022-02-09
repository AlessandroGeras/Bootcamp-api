import {Router} from "express";
import {StatusCodes} from "http-status-codes";
import User from "../Database/UserModel.js";
import jwt from "jsonwebtoken";

const usersroutesecure = Router();

const secret = "geras";

let findallcache = [];

usersroutesecure.get("/secureusers", async(req, res,next) => { 

   var authorization = req.headers['authorization'];
   var token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];
   
   if(authorization){
   const bearer = authorization.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   }

   if(token){
    req.token = token;
   }

   if (req.token) {
       jwt.verify(req.token, secret, function (err, decoded) {
           if (err) {
            res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).send({"Erro":"Falha ao tentar autenticar o token!"})
           } else {
               req.decoded = decoded;
               next();
           }
       });

   } else {
    res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).send({"Erro":"Token não encontrado!"})
}
});


usersroutesecure.get("/secureusers", async(req, res) => { 

   if(findallcache.length>0){
      res.status(StatusCodes.OK).send(findallcache);
   }  

   else{
      const user = await User.findAll();
      findallcache = user;
      return res.status(StatusCodes.OK).send(findallcache);
      }
    }
)


export default usersroutesecure;