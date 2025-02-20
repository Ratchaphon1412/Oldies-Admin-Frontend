import type { Session,AuthError } from "@supabase/supabase-js"

export interface StrictObjectInterface {
    [key: string] : number | string;
}

export type UserInformation = {
    email: string
    first_name: string
    last_name: string
    full_name: string
    birth_date: string
    gender: string
    avatar_url: string
    picture: string
    role: string
}

export type SupabaseSession = {
    data: {
        session: Session | null
    }
    error: AuthError | null
}

export const defaultUserInformation: UserInformation = {
    email: "",
    first_name: "",
    last_name: "",
    full_name: "",
    birth_date: "",
    gender: "",
    avatar_url: "",
    picture: "",
    role: 'guest'
}

// use type on response register email
export type RegisterEmailError = {
    type: string,
    errors: [{
        attr: string,
        code: number,
        detail: string
    }]
}

export type RegisterEmailSuccess = {
    account: {
        email: string,
        supabase_user_id: string
    },
    first_name: string
    last_name: string
    gender: string
    age: number
}