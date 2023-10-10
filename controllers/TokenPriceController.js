const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/CustomError");
require("dotenv").config();

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY
});

const getTokenPrices = async (req, res, next) => {
    try {
        const { contractAddress } = req.query;
        const chain = EvmChain.ETHEREUM;
        const tokenInfo = await Moralis.EvmApi.token.getTokenPrice({
            address: contractAddress,
            chain
        });
        res.status(StatusCodes.OK).json(tokenInfo);
    } catch (error) {
        next(new CustomError(error.details.status, error.details.response.data.message));
    }
}

module.exports = {
    getTokenPrices
}
