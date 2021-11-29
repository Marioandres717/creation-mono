enum type {
  admin,
  content_creator,
}
type User = {
  id?: number;
  email: string;
  active: number;
  username?: string;
  type?: type;
};

export default User;
