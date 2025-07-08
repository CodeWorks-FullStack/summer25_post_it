import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { WatcherProfile } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"

class WatchersService {
  async getWatchersByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/watchers`)
    logger.log('GOT WATCHERS 👀👀👀👀', response.data)
    const watchers = response.data.map(pojo => new WatcherProfile(pojo))
    AppState.watcherProfiles = watchers
  }
}

export const watchersService = new WatchersService()