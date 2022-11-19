import bcrypt from "bcryptjs";

/**
 * Hashes a string
 * @param str string to hash
 * @param salt salt generated by generateSalt function
 * @returns hashed string
 */
export const generateHash = (str: string, salt: string): string => {
  return bcrypt.hashSync(str, salt);
};