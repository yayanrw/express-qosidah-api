interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: Date;
}

export default User;
