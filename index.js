import Express from "express";
import usersroute from "./src/Routes/UsersRoutes.js";
import loginroute from "./src/Routes/LoginRoute.js";
import usersroutesecure from "./src/Routes/UsersRoutesSecure.js";
import routeserver from "./src/Routes/ServerStatus.js";
import cors from "cors";
import sequelize from "./src/Database/Database.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

sequelize.sync().then(() => console.log("Database connected"));

const express_server = Express();

express_server.use(Express.json());

express_server.use(cookieParser());

express_server.use(Express.urlencoded({extended:true}));

express_server.use(cors());

express_server.use(routeserver);

express_server.use(usersroute);

express_server.use(loginroute);

express_server.use(usersroutesecure);

express_server.get("/",function(req,res){
    res.send("Server by Alessandro Geras");
});

express_server.listen(port, () => {console.log(`Server opened on port: ${port}`)
});