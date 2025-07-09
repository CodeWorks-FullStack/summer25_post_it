import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('GOT PICTURES 🖼️🖼️🖼️🖼️🖼️', response.data)
  }
}

export const picturesService = new PicturesService()