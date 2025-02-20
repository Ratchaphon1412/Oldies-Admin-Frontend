import Axios from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()
    const { getSession } = supabase();
    const response = await getSession();


    const ApiClient = Axios.create({
        baseURL: `${config.public.backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en'
        },
    });
    if (response.data?.session?.access_token) {
        ApiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.session.access_token}`;
    }

    ApiClient.interceptors.request.use(async (config) => {
        const { getSession } = supabase();
        const response = await getSession();
        if (response.data?.session?.access_token) {
            config.headers['Authorization'] = `Bearer ${response.data.session.access_token}`;
        }
        return config;
    });

    ApiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                const { getSession } = supabase();
                const session = await getSession();
                if (session?.data?.session?.access_token) {
                    error.config.headers['Authorization'] = `Bearer ${session.data.session.access_token}`;
                    return ApiClient.request(error.config);
                }
                reloadNuxtApp({path:"/"});
            }
            return Promise.reject(error);
        }
    );
    
    nuxtApp.provide('axios', ApiClient)
})