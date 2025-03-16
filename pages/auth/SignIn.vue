<script setup lang="ts">
  import { z } from 'zod'
  import { Button } from '@/components/ui/button'
  import { AutoForm } from '@/components/ui/auto-form'
  import { toast } from '@/components/ui/toast'
  import { LockIcon } from 'lucide-vue-next'
  

  // use the account store
  const { login } = useAccountStore()

  // Define loading state
  const isLoading = ref(false)

  // Define the sign-in form schema using Zod
  const signInSchema = z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password is too long'),
  })

  // Type for our form values
  type SignInValues = z.infer<typeof signInSchema>

  // Handle form submission
  const onSubmit = async (data: SignInValues) => {
    isLoading.value = true

    // api call to login
    const { error } = await login({
      email: data.email,
      password: data.password,
    })
    console.log('error', error)
    isLoading.value = false

    if (!error) {
      toast({
        title: 'Success!',
        description: 'You have successfully signed in.',
        variant: 'default',
      })
      reloadNuxtApp({ path: '/' })
    } else {
      toast({
        title: 'Error',
        description: 'An error occurred while signing in.',
        variant: 'destructive',
      })
    }
  }
</script>

<template>
    <div class="flex flex-col items-center justify-center py-12">
      <!-- Form -->
      <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <div class="flex flex-col gap-2">
            <div class="flex flex-col w-full justify-center items-center p-4 gap-3">
                <Logo class="w-12"/>
                <h1 class="text-black text-xl font-semibold ">Welcome to Admin-Oldies Portal</h1>
            </div>
          <AutoForm
            :schema="signInSchema"
            :class="'space-y-6'"
            :field-config="{
              email: { 
                label: 'Email address',
                inputProps: { type: 'email', placeholder:'Admin@olides.com' },
              },
              password: { 
                label: 'Password', 
                inputProps: { type: 'password' },
                description: 'Please enter a password between 8 characters.',
              },
            }"
            @submit="onSubmit"
          >
            <!-- Form will be automatically generated here -->
            <div class="text-sm">
              <a href="#" class="font-medium text-primary hover:text-primary/90">
                Forgot your password?
              </a>
            </div>
  
            <!-- Custom Submit Button -->
            <div class="mt-6">
              <Button
                type="submit"
                :disabled="isLoading"
                class="w-full flex justify-center py-6"
              >
                <LockIcon
                  v-if="isLoading"
                  class="mr-2 h-4 w-4 animate-spin"
                />
                <LockIcon
                  v-else
                  class="mr-2 h-4 w-4"
                />
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
              </Button>
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
</template>