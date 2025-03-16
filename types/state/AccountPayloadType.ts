export interface RegisterBodyType {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
}
export const defaultRegisterBody: RegisterBodyType = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  gender: "",
  birth_date: "",
}

export interface RegisterOauthBodyType {
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
}

export const defaultRegisterOauthBody: RegisterOauthBodyType = {
  first_name: "",
  last_name: "",
  gender: "",
  birth_date: "",
}

export interface LoginBodyType {
    email: string;
    password: string;
}