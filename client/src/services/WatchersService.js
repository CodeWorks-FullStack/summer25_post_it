import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { WatcherAlbum, WatcherProfile } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"

class WatchersService {
  async deleteWatcher(watcherId) {
    const response = await api.delete(`/api/watchers/${watcherId}`)
    logger.log('deleted watcher', response.data)
    const watchers = AppState.watcherAlbums
    const index = watchers.findIndex(watcher => watcher.id == watcherId)
    // NOTE this is good code
    // watchers.splice(index, 1)

    // NOTE reference at your own peril
    const deletedWatcher = watchers.splice(index, 1)[0]
    watchers.forEach(watcher => {
      if (watcher.albumId == deletedWatcher.albumId) watcher.album.watcherCount--
    })
  }
  async getMyWatchedAlbums() {
    const response = await api.get('account/watching')
    logger.log('GOT WATCHED ALBUMS 👀📔👀📔', response.data)
    const watchers = response.data.map(pojo => new WatcherAlbum(pojo))
    AppState.watcherAlbums = watchers
  }
  async createWatcher(watcherData) {
    const response = await api.post('api/watchers', watcherData)
    logger.log('CREATED WATCHER 👀', response.data)
    const watcher = new WatcherProfile(response.data)
    AppState.watcherProfiles.push(watcher)
    AppState.album.watcherCount++
  }

  async getWatchersByAlbumId(albumId) {
    AppState.watcherProfiles = [] //🙅‍♂️👻
    const response = await api.get(`api/albums/${albumId}/watchers`)
    logger.log('GOT WATCHERS 👀👀👀👀', response.data)
    const watchers = response.data.map(pojo => new WatcherProfile(pojo))
    AppState.watcherProfiles = watchers
  }
}

export const watchersService = new WatchersService()