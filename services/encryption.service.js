const crypto = require("crypto");
const {Buffer} = require("buffer");
const internal_algorithm = "aes-256-gcm";

function KMSEncrypt(data) {
    const cipher = crypto.createCipheriv(
        internal_algorithm,
        process.env.KMS_AES_KEY,
        Buffer.from(process.env.KMS_AES_IV, "base64")
    );
    let encryptedData = cipher.update(data, "utf8", "base64");
    encryptedData += cipher.final("base64");
    const tag = cipher.getAuthTag();
    return encryptedData + "$$" + tag.toString("base64");
}

function KMSDecrypt(data) {
    const decipher = crypto.createDecipheriv(
        internal_algorithm,
        process.env.KMS_AES_KEY,
        Buffer.from(process.env.KMS_AES_IV, "base64")
    );
    const dataSplit = data.split("$$");
    decipher.setAuthTag(Buffer.from(dataSplit[1], "base64"));
    let decryptedData = decipher.update(dataSplit[0], "base64", "utf8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

module.exports = {
    KMSEncrypt,
    KMSDecrypt
}