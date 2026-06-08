import { createContentLoader } from 'vitepress'
import type { BlogPost } from './data/types'

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData): BlogPost[] {
    return rawData
      .filter(page => page.frontmatter.title && page.frontmatter.date)
      .filter(page => page.url !== '/blog/')
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
      .map(page => ({
        title: page.frontmatter.title,
        date: page.frontmatter.date,
        authors: page.frontmatter.authors || [],
        description: page.frontmatter.description || page.excerpt,
        url: page.url,
      }))
  }
})
