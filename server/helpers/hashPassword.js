import crypto from "crypto";

const hashPasswordWithSalt = (password, salt) => {
    const hashedPassword = crypto.pbkdf2Sync(
      password,
      salt,
      10000, // Number of iterations
      64, // Key length
      'sha512' // Hashing algorithm
    ).toString('hex');
    return hashedPassword;
};

export default hashPasswordWithSalt;
  