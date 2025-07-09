import { dbContext } from "../db/DbContext.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator', 'name picture')
    return pictures
  }
  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
}

export const picturesService = new PicturesService()