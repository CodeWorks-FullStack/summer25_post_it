import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class AlbumsService {
  async deleteAlbum(albumId) {
    const album = await this.getAlbumById(albumId)
    await album.deleteOne()
  }
  async archiveAlbum(albumId, userInfo) {
    // NOTE a soft delete does not actually remove the item from the database, in this case it just changes a boolean value

    const album = await this.getAlbumById(albumId)

    if (album.creatorId != userInfo.id) {
      throw new Forbidden(`You cannot archive another user's album ${userInfo.nickname}!`)
    }

    album.archived = !album.archived // flips bool

    await album.save() // updates myself in the database

    return album
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture').populate('watcherCount')

    if (!album) { // if (album == null) 
      throw new BadRequest(`Invalid id: ${albumId}`)
    }

    return album
  }

  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture').populate('watcherCount')
    return albums
  }

  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }

}

export const albumsService = new AlbumsService()