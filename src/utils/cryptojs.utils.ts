import CryptoJS from 'crypto-js';

const encryp = (data: string): string => {
  return CryptoJS.AES.encrypt(data, 'EncryptionKey').toString();
}

const decryp = (data: string): string => {
  const decrypted = CryptoJS.AES.decrypt(data, 'EncryptionKey')
  return decrypted.toString(CryptoJS.enc.Utf8)
}

const tokenCard = (): string => {
  const length = 16
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
  let result = '';
  if (length > characters.length) throw Error('invalid leng');
  for (let i = 0; i < length; i++) {
    result += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
  }
  return result;
}

export {
  encryp,
  decryp,
  tokenCard
};
