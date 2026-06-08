import { gems } from '../.vitepress/data/software'

export default {
  paths() {
    return gems.map(gem => ({
      params: { gem: gem.id },
    }))
  }
}
