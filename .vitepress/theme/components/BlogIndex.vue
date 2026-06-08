<template>
  <div class="blog-index">
    <div class="blog-list">
      <a v-for="post in sortedPosts" :key="post.url" :href="post.url" class="blog-item entry-card">
        <div class="blog-item-meta">
          <time class="blog-item-date">{{ formatDate(post.date) }}</time>
          <span v-if="post.authors.length" class="blog-item-authors">
            &middot; {{ post.authors.join(', ') }}
          </span>
        </div>
        <h2 class="blog-item-title">{{ post.title }}</h2>
        <p class="blog-item-desc">{{ post.description }}</p>
        <span class="blog-item-link">
          Read more
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </span>
      </a>
    </div>

    <p v-if="!sortedPosts.length" class="empty-state">
      No posts yet.
    </p>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../../posts.data'

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>

<style scoped>
.blog-index {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-item {
  position: relative;
  display: block;
  padding: 28px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background 0.15s;
}
.blog-item:hover {
  border-color: rgba(31,108,241,0.3);
}

.blog-item-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.blog-item-date {
  font-weight: 500;
}

.blog-item-authors {
  color: var(--vp-c-text-3);
}

.blog-item-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  transition: color 0.15s;
}
.blog-item:hover .blog-item-title {
  color: #1F6CF1;
}

.blog-item-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-item-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #1F6CF1;
}
.blog-item-link svg {
  transition: transform 0.15s;
}
.blog-item:hover .blog-item-link svg {
  transform: translateX(3px);
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 64px 0;
}
</style>
