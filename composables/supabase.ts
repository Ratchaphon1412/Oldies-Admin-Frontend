import type { Provider, User ,OAuthResponse ,AuthTokenResponse,SupabaseClient } from '@supabase/supabase-js';
import type { UserInformation, StrictObjectInterface ,SupabaseSession } from '@/types/services/SuppabaseType';
import { defaultUserInformation } from '@/types/services/SuppabaseType';

export default function () {
    const supabase:SupabaseClient = useSupabaseClient();
    const config = useRuntimeConfig();
    
    const redirect: string = config.public.supabaseRedirectUrl as string;

    async function signIn(email: string, password: string): Promise<{ error: Error | null }> {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    }

    async function signWithProvider(social: Provider): Promise<OAuthResponse> {
        const oauth = await supabase.auth.signInWithOAuth({
            provider: social,
            options: {
                redirectTo: redirect,
            }
        });
        return oauth
    }

    async function signUp(email: string, password: string, otherData?: StrictObjectInterface): Promise<{ user: User | null ,error: Error | null }> {
        const { data: { user } , error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                data: otherData
            }
        });
        
        return { user, error };
    }

    async function signOut(): Promise<{ error: Error | null }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    async function getUser(): Promise<UserInformation> {
        const isUser = (await supabase.auth.getUser()).data.user
        if (isUser) {
            return isUser.user_metadata as UserInformation;
        } else {
            return { ...defaultUserInformation }
        }
    }

    async function exchangeCode(code:string): Promise<AuthTokenResponse> {
        const response = await supabase.auth.exchangeCodeForSession(code);

        return response;
    }
    async function getSession(): Promise<SupabaseSession> {
        const response = await supabase.auth.getSession();

        return response;
    }

    return { signIn, signUp, signOut, signWithProvider, getUser,exchangeCode,getSession};
}