import { flavors } from '../.vitepress/data/flavors'

export default {
  paths() {
    return flavors.map(flavor => ({
      params: { flavor: flavor.id },
    }))
  }
}
