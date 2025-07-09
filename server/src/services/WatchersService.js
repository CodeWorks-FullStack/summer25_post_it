import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class WatchersService {
  async deleteWatcher(watcherId, userInfo) {
    const watcher = await dbContext.Watchers.findById(watcherId)

    if (!watcher) {
      throw new BadRequest(`Invalid id: ${watcherId}`)
    }

    if (userInfo.id != watcher.accountId) {
      throw new Forbidden(`YOU ARE GOING TO JAIL ${userInfo.nickname.toUpperCase()}!`)
    }

    await watcher.deleteOne()
  }
  async getWatchersByAccountId(userId) {
    // const watchers = await dbContext.Watchers.find({ accountId: userId }).populate('album')
    // NOTE nested populate. we have to populate the album FIRST, and then run the virtuals on the album schema
    const watchers = await dbContext.Watchers.find({ accountId: userId }).populate({
      path: 'album',
      populate: {
        path: 'creator watcherCount',
        select: 'name picture'
      }
    })
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