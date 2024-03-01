export enum enumUserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
  banned = "banned",
  trainer = "trainer",
}

export interface iUserData {
  _id?: string;
  email: string;
  role: enumUserRole;
  avatar?: string;
  name: string;
}

export interface iUser extends iUserData {
  password: string;
}
