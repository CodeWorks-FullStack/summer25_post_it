import { dbContext } from "../db/DbContext.js"

class WatchersService {
  async getWatchersByAccountId(userId) {
    const watchers = await dbContext.Watchers.find({ accountId: userId }).populate('album')
    return watchers
  }
  async getWatchersByAlbumId(albumId) {
    // const watchers = await dbContext.Watchers.find({ albumId: '686d5c7c002330ede6f6a703' })
    const watchers = await dbContext.Watchers.find({ albumId: albumId }).populate('profile', 'name picture')
    return watchers
  }
  async createWatcher(watcherData) {
    const watcher = await dbContext.Watchers.create(watcherData)
    await watcher.populate('profile', 'name picture')
    await watcher.populate('album')
    return watcher
  }
}

export const watchersService = new WatchersService()