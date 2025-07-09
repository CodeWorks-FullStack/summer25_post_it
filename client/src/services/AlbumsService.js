import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"

class AlbumsService {
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('CREATED ALBUM 📔✨', response.data)
    const album = new Album(response.data)
    AppState.albums.push(album)
    return album.id
  }
  async archiveAlbum(albumId) {
    const response = await api.delete(`/api/albums/${albumId}`)
    logger.log('ARCHIVED ALBUM 🔒', response.data)
    const album = new Album(response.data)
    AppState.album = album
  }
  async getAlbumById(albumId) {
    AppState.album = null
    const response = await api.get(`/api/albums/${albumId}`)
    logger.log('GOT ALBUM 📔', response.data)
    const album = new Album(response.data)
    AppState.album = album
  }
  async getAlbums() {
    const response = await api.get('api/albums')
    logger.log('GOT ALBUMS 📔📔📔📔📔', response.data)
    const albums = response.data.map(pojo => new Album(pojo))
    AppState.albums = albums
  }
}

export const albumsService = new AlbumsService()