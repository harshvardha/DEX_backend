const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { StatusCodes } = require("http-status-codes");
const TokenRoutes = require("./routes/TokenRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan("common"));

app.use("/token", TokenRoutes);
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = error.message || "Server Error, We are fixing it."
    res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage
    });
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});