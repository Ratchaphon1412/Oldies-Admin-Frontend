export default function () {
    const { $axios } = useNuxtApp()

    async function getApproveFacilitatorAPI(params: string): Promise<{ status: number }> {
        return await $axios.get(`/facilitator/active/${params}/`).then(({ status }) => {
            return { status: status };
        }).catch((error) => {
            return { status: error.response.status, data: error.response.data };
        });
    }

    async function getApprovePackageAPI(params: string): Promise<{ status: number }> {
        return await $axios.get(`/package/approve/${params}/`).then(({ status }) => {
            return { status: status };
        }).catch((error) => {
            return { status: error.response.status, data: error.response.data };
        });
    }

    return { getApproveFacilitatorAPI, getApprovePackageAPI }
}