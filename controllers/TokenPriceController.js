const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/CustomError");
require("dotenv").config();

const getTokenPrices = async (req, res, next) => {
    try {
        const { tokenToSellAddress, tokenToBuyAddress, amount, chainId } = req.query;
        let chain;
        switch (chainId) {
            case "0x1":
                chain = 1;
                break;
            case "0x89":
                chain = 137;
                break;
            default:
                console.log("invalid chain id");
                break;
        }
        const tokenInfo = await axios.get(`https://api-dzap.1inch.io/v5.2/${chain}/quote?src=${tokenToSellAddress}&dst=${tokenToBuyAddress}&amount=${amount}`);
        res.status(StatusCodes.OK).json(tokenInfo.data);
    } catch (error) {
        console.log(error);
        next(new CustomError(error.data.statusCode, error.data.description));
    }
}

module.exports = {
    getTokenPrices
}
