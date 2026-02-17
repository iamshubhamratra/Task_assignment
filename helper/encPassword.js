const bcrypt = require("bcrypt");
const sendResponse = require("../helper/sendResponse")

// encPassword
async function encPass(password, key, hashedPass, salt = 10) {
  try {
    if (key === "encrypt") {
      const passSalt = await bcrypt.genSalt(salt);
      const hashedPass = await bcrypt.hash(password, passSalt);
      return hashedPass;
    } else if (key === "decrypt") {
      const passCompare = await bcrypt.compare(password, hashedPass);
      return passCompare;
    } else {
    return sendResponse(res, 400, "Failure",  "error in helper encPassword encpryt and dcrypt not provided>>>>", );
    }
  } catch (err) {
console.error(err);

    return sendResponse(
      res,
      500,
      "failure",
      "Internal server error"
    );  }
}

module.exports = encPass;
