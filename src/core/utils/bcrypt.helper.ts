import bcrypt from "bcrypt";

const encrypt = async (key: string): Promise<string> => {
  return await bcrypt.hash(key, 10);
};

const isPasswordValid = async (
  inputPassword: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export { encrypt, isPasswordValid };
