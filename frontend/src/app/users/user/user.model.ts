export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  profile: UserProfile;
  accessToken: string;
}

export enum UserProfile {
  ADMIN = "ADMIN",
  USER = "USER"
}
