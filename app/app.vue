<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: boolean) => { colorMode.preference = val ? 'dark' : 'light' }
})

const navItems = [
  { label: 'Dashboard', to: '/', icon: 'i-heroicons-chart-bar-square' },
  { label: 'Opportunities', to: '/opportunities', icon: 'i-heroicons-bolt' },
  { label: 'Scan Logs', to: '/scan-logs', icon: 'i-heroicons-document-magnifying-glass' },
  { label: 'Trades', to: '/trades', icon: 'i-heroicons-arrows-right-left' },
  { label: 'Settings', to: '/settings', icon: 'i-heroicons-cog-6-tooth' },
]

const mobileMenuOpen = ref(false)

watch(route, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <UApp>
    <div class="app-shell">
      <!-- Header -->
      <header class="app-header">
        <div class="header-inner">
          <NuxtLink to="/" class="header-brand">
            <div class="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span class="brand-text">Polymarket Arb</span>
            <span class="brand-tag">BOT</span>
          </NuxtLink>

          <!-- Desktop nav -->
          <nav class="header-nav desktop-nav">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="nav-link"
              :class="{ 'nav-link--active': route.path === item.to }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="header-actions">
            <USwitch
              v-model="isDark"
              on-icon="i-heroicons-moon"
              off-icon="i-heroicons-sun"
              size="lg"
            />

            <!-- Mobile hamburger -->
            <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <template v-if="!mobileMenuOpen">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </template>
                <template v-else>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </template>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile nav -->
        <Transition name="slide-down">
          <nav v-if="mobileMenuOpen" class="mobile-nav">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="mobile-nav-link"
              :class="{ 'nav-link--active': route.path === item.to }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </Transition>
      </header>

      <!-- Main -->
      <main class="app-main">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <p>Polymarket Arb Bot &middot; Dry-run Mode &middot; {{ new Date().getFullYear() }}</p>
      </footer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
/**
 * Default SEO head tags.
 * Individual pages can override these with their own useSeoMeta / useHead.
 */
const { site } = useAppConfig() as any
const runtimeConfig = useRuntimeConfig()

const siteName = site?.name || 'Nuxt v4 Template'
const siteUrl = runtimeConfig.public.appUrl || 'https://nuxt-v4-template.pages.dev'

useSeoMeta({
  titleTemplate: `%s — ${siteName}`,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: siteUrl,
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
})
</script>
