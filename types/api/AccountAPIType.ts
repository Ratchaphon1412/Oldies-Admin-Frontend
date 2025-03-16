export interface RequestRegisterUserAccountType {
    account: {
        email: string
        supabase_user_id: string
    }
    first_name: string
    last_name: string
    gender: string
    birth_date: string
}

export interface ResponseRegisterUserAccountType {
    account: {
        email: string
        supabase_user_id: string
    }
    first_name: string
    last_name: string
    gender: string
    birth_day: string
}

export interface RequestUpdateProfileType {
    first_name: string
    last_name: string
    gender: string
    birth_day: string
}

export interface ResponseUpdateProfileType {
    first_name: string
    last_name: string
    gender: string
    birth_day: string
}

export interface ResponseMeType {
    account: {
        email: string
        supabase_user_id: string
    }
    role:  string
}