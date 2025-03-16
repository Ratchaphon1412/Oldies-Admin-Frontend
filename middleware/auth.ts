export default defineNuxtRouteMiddleware(async () => {
  try {
    const { meAPI } = accountAPI()
    const { status } = await meAPI()
    
    if (status === 403) {
      return '/auth/SignIn'
    }
  } catch (error) {
    console.log('middleware auth : ', error)
  }
})