const crypto = require("crypto");
const {Buffer} = require("buffer");
const internal_algorithm = "aes-256-cbc";

function KMSEncrypt(data) {
    const cipher = crypto.createCipheriv(
        internal_algorithm,
        process.env.KMS_AES_KEY,
        Buffer.from(process.env.KMS_AES_IV, "base64")
    );
    let encryptedData = cipher.update(data, "utf8", "base64");
    encryptedData += cipher.final("base64");
    return encryptedData;
}

function KMSDecrypt(data) {
    const decipher = crypto.createDecipheriv(
        internal_algorithm,
        process.env.KMS_AES_KEY,
        Buffer.from(process.env.KMS_AES_IV, "base64")
    );
    let decryptedData = decipher.update(data, "base64", "utf8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

module.exports = {
    KMSEncrypt,
    KMSDecrypt
}