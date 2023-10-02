const crypto = require("crypto");
const {Buffer} = require("buffer");
const internal_algorithm = "aes-256-gcm";
const ECDH_curve = "prime256v1";

function generateECDHKeys() {
    const ECDH = crypto.createECDH(ECDH_curve);
    ECDH.generateKeys();
    const publicKey = ECDH.getPublicKey("base64");
    return { public: publicKey, cipher: ECDH };
}

function createSecret(publicKey, cipher) {
    const secret = cipher.computeSecret(
        Buffer.from(publicKey, "base64"),
        null,
        "base64"
    );
    const key = crypto.pbkdf2Sync(secret, "salt", 100000, 22, "sha256");
    return key.toString("base64");
}

function KMSEncrypt(data, key, publicKey) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(internal_algorithm, key, iv);
    let encryptedData = cipher.update(data, "utf8", "base64");
    encryptedData += cipher.final("base64");
    const tag = cipher.getAuthTag();
    return {
        data: encryptedData,
        public_key: publicKey,
        iv: Buffer.from(iv).toString("base64"),
        tag: tag.toString("base64"),
    };
}

function KMSDecrypt(data, key, iv, tag) {
    const decipher = crypto.createDecipheriv(
        internal_algorithm,
        key,
        Buffer.from(iv, "base64")
    );
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    let decryptedData = decipher.update(data, "base64", "utf8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

module.exports = {
    generateECDHKeys,
    createSecret,
    KMSEncrypt,
    KMSDecrypt
}