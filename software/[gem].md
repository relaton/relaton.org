---
layout: page
outline: false
---

<SoftwarePage :gem="gemData" />

<script setup lang="ts">
import { useData } from 'vitepress'
import { gems } from '../.vitepress/data/software'
import type { SoftwareGem } from '../.vitepress/data/types'

const { page } = useData()
const gemId = (page.value.params?.gem as string) || ''
const gemData: SoftwareGem | undefined = gems.find(g => g.id === gemId)
</script>
