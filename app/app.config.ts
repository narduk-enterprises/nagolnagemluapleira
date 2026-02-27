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
      }
    }
  }
})
