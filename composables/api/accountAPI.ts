import type { 
    RequestRegisterUserAccountType,
    ResponseRegisterUserAccountType,
    RequestUpdateProfileType,
    ResponseUpdateProfileType,
    ResponseMeType
   } from '@/types/api/AccountAPIType';
   import type { ResponseErrorType } from '@/types/api/ErrorAPIType';
  
  
  export default function () {
    const { $axios } = useNuxtApp()
  
    async function signUpAPI(body:RequestRegisterUserAccountType): Promise<{ status: number, data: ResponseRegisterUserAccountType | ResponseErrorType }> {
      return await $axios.post('/facilitator/create/',body).then(({status,data}) => {
        return { status: status, data: data };
      }
      ).catch((error)=>{
        return { status: error.response.status, data:  error.response.data };
      });
    
    }
  
    async function updateProfileAPI(body:RequestUpdateProfileType): Promise<{ status: number, data: ResponseUpdateProfileType | ResponseErrorType }> {
      return $axios.post('/user/update/',body).then(({status,data}) => {
        return { status: status, data: data };
      }).catch((error)=>{
        return { status: error.response.status, data:  error.response.data };
      });
    }
  
    async function meAPI(): Promise<{ status: number, data: ResponseMeType | ResponseErrorType }> {
      return $axios.get('/me/').then(({status,data}) => {
        return { status: status, data: data };
      }).catch((error)=>{
        return { status: error.response.status, data:  error.response.data };
      });
    }
  
    return { 
      updateProfileAPI,
      signUpAPI,
      meAPI
     };
  }