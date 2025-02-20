import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
    features: { tooling: true },
}).append({
    rules: {
        // Add your own rules
        "vue/multi-word-component-names": 'off',
    },
})