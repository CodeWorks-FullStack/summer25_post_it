import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PicturesService {
  async deletePicture(pictureId, userInfo) {
    const picture = await dbContext.Pictures.findById(pictureId)
    if (picture == null) {
      throw new BadRequest(`Invalid id: ${pictureId}`)
    }
    if (picture.creatorId != userInfo.id && !userInfo.permissions.includes('delete:pictures')) {
      throw new Forbidden("You cannot delete another user's picture!")
    }
    await picture.deleteOne()
  }
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