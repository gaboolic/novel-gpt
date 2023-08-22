const dotenv = require("dotenv")
dotenv.config()



var config = {
    "OPENAI_API_KEY": process.env.OPENAI_API_KEY,
    "OPENAI_API_BASE_URL": process.env.OPENAI_API_BASE_URL
}
module.exports = config;
