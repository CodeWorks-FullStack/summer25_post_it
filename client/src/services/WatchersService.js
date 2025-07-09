import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { WatcherProfile } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"

class WatchersService {
  async getMyWatchedAlbums() {
    const response = await api.get('account/watching')
    logger.log('GOT WATCHED ALBUMS 👀📔👀📔', response.data)
  }
  async createWatcher(watcherData) {
    const response = await api.post('api/watchers', watcherData)
    logger.log('CREATED WATCHER 👀', response.data)
    const watcher = new WatcherProfile(response.data)
    AppState.watcherProfiles.push(watcher)
    AppState.album.watcherCount++
  }

  async getWatchersByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/watchers`)
    logger.log('GOT WATCHERS 👀👀👀👀', response.data)
    const watchers = response.data.map(pojo => new WatcherProfile(pojo))
    AppState.watcherProfiles = watchers
  }
}

export const watchersService = new WatchersService()