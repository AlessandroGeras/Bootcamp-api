import Express from "express";
import usersroute from "./Routes/UsersRoutes.js";
import loginroute from "./Routes/LoginRoute.js";
import usersroutesecure from "./Routes/UsersRoutesSecure.js";
import routeserver from "./Routes/ServerStatus.js";
import cors from "cors";
import sequelize from "./Database/Database.js";
import cookieParser from "cookie-parser";

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

express_server.listen(5000, () => console.log("Server opened on port 5000"));