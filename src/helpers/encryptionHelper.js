import CryptoJS from "crypto-js";

const SECRET_KEY = "9YS5a5vWZbJPZkFWK5pAYdESrdaUyyHz";

export const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
};

export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Error decrypting data", error);
        return null;
    }
};
