import User from "./User";

export default interface LoginInfo {
  isLoggedIn: boolean | null;
  user?: User | null;
  uid?: String | null;
}
