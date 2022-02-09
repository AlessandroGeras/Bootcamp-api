import {Router} from "express";
import {StatusCodes} from "http-status-codes";

const routeserver = Router();

routeserver.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK);
})



export default routeserver;