<script setup lang="ts">
import type { FieldProps } from './interface'
import { AutoFormLabel } from '@/components/ui/auto-form'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Header from '@editorjs/header'
import List from '@editorjs/list'

defineProps<FieldProps>()

const editorConfig = {
  holder: 'editor-container',
  placeholder: 'Start typing your description here...',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    }
  }
}
</script>

<template>
  <FormField v-slot="{ field }" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel 
        v-if="!config?.hideLabel" 
        :required="required"
      >
        {{ config?.label }}
      </AutoFormLabel>
      <FormControl>
        <ClientOnly>
          <editor-js
            :model-value="field.value"
            :config="editorConfig"
            class="border rounded-md w-full min-h-[200px] p-4"
            holder="editor-container"
            @update:model-value="field.onChange"
          />
        </ClientOnly>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>