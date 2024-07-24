// All the code in this file were adapted from NeteaseCloudMusicApi source code

import forge from 'node-forge';
import CryptoJS from 'crypto-js';

const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const presetKey = '0CoJUm6Qyw8W8jud'
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`
const iv = '0102030405060708'

const rsaEncrypt = (str, key) => {
    const forgePublicKey = forge.pki.publicKeyFromPem(key)
    const encrypted = forgePublicKey.encrypt(str, 'NONE')
    return forge.util.bytesToHex(encrypted)
}

const aesEncrypt = (text, mode, key, iv, format = 'base64') => {
    let encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(text),
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode[mode.toUpperCase()],
            padding: CryptoJS.pad.Pkcs7,
        },
    )
    if (format === 'base64') {
        return encrypted.toString()
    }

    return encrypted.ciphertext.toString().toUpperCase()
}

const weapi = (object) => { // from NeteaseCloudMusicApi
    const text = JSON.stringify(object)
    let secretKey = ''
    for (let i = 0; i < 16; i++) {
        secretKey += base62.charAt(Math.round(Math.random() * 61))
    }
    return {
        params: aesEncrypt(
            aesEncrypt(text, 'cbc', presetKey, iv),
            'cbc',
            secretKey,
            iv,
        ),
        encSecKey: rsaEncrypt(secretKey.split('').reverse().join(''), publicKey),
    }
}

/*
Object Example:
{
    id: '114514',
    private_cloud: 'true',
    work_type: 1,
    order: 'hot',
    offset: 0,
    limit: 100,
    csrf_token: ''
}
*/

export { weapi };