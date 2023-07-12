import bcrypt from "bcrypt";

const encrypt = async (key: string): Promise<string> => {
  return await bcrypt.hash(key, 10);
};

const isStringsValid = async (
  inputPassword: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export { encrypt, isStringsValid };
