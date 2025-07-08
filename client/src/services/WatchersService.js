import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class WatchersService {
  async getWatchersByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/watchers`)
    logger.log('GOT WATCHERS 👀👀👀👀', response.data)
  }
}

export const watchersService = new WatchersService()