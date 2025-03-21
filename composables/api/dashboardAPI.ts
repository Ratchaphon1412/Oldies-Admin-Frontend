import type { 
  ResponseListPackagesAPIType,
  ResponseListBookingAPIType,
  ResponseListFacilitatorAPIType
} from '@/types/api/DashboradAPIType'

export default function (){
  const { $axios } = useNuxtApp()

  async function getAdminListPackagesAPI(params:string = ''): Promise<{ status: number, data: ResponseListPackagesAPIType }> {
    return await $axios.get(`/admin/packages/${params}`).then(({status,data}) => {
      return { status: status, data: data };
    }).catch((error)=>{
      return { status: error.response.status, data:  error.response.data };
    });
  }

  async function getAdminListBookingAPI(params: string = ''): Promise<{ status: number, data: ResponseListBookingAPIType }> {
    return await $axios.get(`/admin/bookings/${params}`).then(({status,data}) => {
      return { status: status, data: data };
    }).catch((error)=>{
      return { status: error.response.status, data:  error.response.data };
    });
  }

  async function getAdminFacilitatorListAPI(params: string = ''): Promise<{ status: number, data: ResponseListFacilitatorAPIType }> {
    return await $axios.get(`/admin/facilitator/${params}`).then(({status,data}) => {
      return { status: status, data: data };
    }).catch((error)=>{
      return { status: error.response.status, data:  error.response.data };
    });
  }

  return { getAdminListPackagesAPI, getAdminListBookingAPI, getAdminFacilitatorListAPI }
}