<!-- 
  OG Image Default Template
  
  Rendered at the edge via Satori (part of nuxt-og-image / @nuxtjs/seo).
  This is the default template used when calling `defineOgImage()` or
  the `useSeo({ ogImage: {...} })` composable.
  
  Satori renders this Vue component to an SVG, then converts to PNG.
  Note: Satori has limited CSS support — use inline styles and flexbox only.
  No Tailwind classes, no CSS Grid, no pseudo-elements.
-->
<!-- eslint-disable atx/no-inline-hex -->
<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  icon?: string
  siteName?: string
}>(), {
  title: 'Nuxt 4 Template',
  description: 'Production-ready Nuxt 4 + Cloudflare Workers',
  icon: '✨',
  siteName: 'Nagolnagemluapleira',
})
const COLORS = {
  bgStart: '#0a0f1a',
  bgMid: '#0f1729',
  bgEnd: '#111d33',
  primary: '#10b981',
  secondary: '#3b82f6',
  accent: '#8b5cf6',
  foreground: '#f1f5f9',
  muted: '#94a3b8',
  slate: '#64748b'
} as const
</script>

<template>
  <div
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '80px',
      background: `linear-gradient(135deg, ${COLORS.bgStart} 0%, ${COLORS.bgMid} 40%, ${COLORS.bgEnd} 100%)`,
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Accent gradient blob -->
    <div
      :style="{
        position: 'absolute',
        top: '-120px',
        right: '-80px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${COLORS.primary}26 0%, transparent 70%)`,
      }"
    />

    <!-- Bottom accent line -->
    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`,
      }"
    />

    <!-- Icon -->
    <div
      :style="{
        fontSize: '48px',
        marginBottom: '24px',
      }"
    >
      {{ icon }}
    </div>

    <!-- Title -->
    <div
      :style="{
        fontSize: '56px',
        fontWeight: '700',
        color: COLORS.foreground,
        lineHeight: '1.15',
        marginBottom: '16px',
        maxWidth: '900px',
        letterSpacing: '-0.02em',
      }"
    >
      {{ title }}
    </div>

    <!-- Description -->
    <div
      :style="{
        fontSize: '24px',
        fontWeight: '400',
        color: COLORS.muted,
        lineHeight: '1.5',
        maxWidth: '800px',
      }"
    >
      {{ description }}
    </div>

    <!-- Site name badge -->
    <div
      :style="{
        position: 'absolute',
        bottom: '40px',
        right: '80px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }"
    >
      <div
        :style="{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '700',
        }"
      >
        N4
      </div>
      <div
        :style="{
          fontSize: '18px',
          fontWeight: '600',
          color: COLORS.slate,
        }"
      >
        {{ siteName }}
      </div>
    </div>
  </div>
</template>
