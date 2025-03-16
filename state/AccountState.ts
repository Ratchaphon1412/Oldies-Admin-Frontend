import { defineStore } from "pinia";
import type { 
  LoginBodyType,
  RegisterBodyType,
  RegisterOauthBodyType,
 } from "~/types/state/AccountPayloadType";
import type { Provider } from "@supabase/supabase-js";

export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      access: "",
      refresh: "",
    };
  },
  actions: {
    async register(payload:RegisterBodyType) {
      const { signUpAPI } = accountAPI();
      const { signUp } = supabase();

      const { user, error } = await signUp(payload.email, payload.password);
      if (error === null && user !== null) {
        const { status, data } = await signUpAPI({
          account: {
            email: payload.email,
            supabase_user_id: user?.id,
          },
          first_name: payload.first_name,
          last_name: payload.last_name,
          gender: payload.gender,
          birth_date: payload.birth_date,
        });
        return { status, data };
      }
      return { status: 500, data: error };
    },
    async registerOauth(payload:RegisterOauthBodyType) {
      const { getSession } = supabase();
      const { signUpAPI } = accountAPI();
      const session = await getSession();

      if (session?.error) {
        return { status: 500, data: session.error };
      }

      const { status, data } = await signUpAPI({
        account: {
          email: session?.data?.session?.user?.email ?? "",
          supabase_user_id: session?.data?.session?.user?.id ?? "",
        },
        first_name: payload.first_name,
        last_name: payload.last_name,
        gender: payload.gender,
        birth_date: payload.birth_date,
      });

      return { status, data };

    },
    async login(payload:LoginBodyType) {
      const { signIn } = supabase();
      const { error } = await signIn(payload.email, payload.password);
      
      return { error };
    },
    async logout() {
      const { signOut } = supabase();
      const { error } = await signOut();
      return { error };
    },
    async getMe() {
      const { meAPI } = accountAPI();
      const { status, data } = await meAPI();
      return { status, data };
    },
    async signInWithProvider(provider:Provider) {
      const { signWithProvider } = supabase();
      const oauth = await signWithProvider(provider);
      return { provider: oauth.data.provider, url: oauth.data.url, error: oauth.error };
    }
  },
  persist: true,
});