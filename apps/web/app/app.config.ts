export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    card: {
      slots: {
        root: 'bg-(--color-card) text-(--color-card-foreground) ring-(--color-border)',
        header: 'border-[var(--color-border)]',
        footer: 'border-[var(--color-border)]',
        body: 'p-6'
      },
      variants: {
        variant: {
          outline: {
            root: 'bg-(--color-card) text-(--color-card-foreground) ring ring-(--color-border) divide-y divide-(--color-border)'
          },
          soft: {
            root: 'bg-(--color-card) text-(--color-card-foreground) divide-y divide-(--color-border)'
          },
          subtle: {
            root: 'bg-(--color-card) text-(--color-card-foreground) ring ring-(--color-border) divide-y divide-(--color-border)'
          }
        }
      }
    }
  },
  auth: { redirectPath: '/' },
})
