export default interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}
