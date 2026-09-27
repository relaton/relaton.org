import type { BlogPost } from './types'

const modules = import.meta.glob<{ frontmatter: Record<string, any> }>(
  '../pages/blog/*.md',
  { eager: true },
)

export const data: BlogPost[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace(/^.*\/blog\//, '').replace(/\.md$/, '')
    const fm = mod.frontmatter
    return {
      title: fm.title ?? '',
      date: fm.date ?? '',
      authors: fm.authors || [],
      description: fm.description || '',
      url: `/blog/${slug}/`,
    }
  })
  .filter((p) => p.title && p.date && p.url !== '/blog/')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
