import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"

class AlbumsService {
  async getAlbums() {
    const response = await api.get('api/albums')
    logger.log('GOT ALBUMS 📔📔📔📔📔', response.data)
    const albums = response.data.map(pojo => new Album(pojo))
    AppState.albums = albums
  }
}

export const albumsService = new AlbumsService()