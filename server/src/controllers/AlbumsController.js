import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { watchersService } from "../services/WatchersService.js";
import { picturesService } from "../services/PicturesService.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/watchers', this.getWatchersByAlbumId)
      .get('/:albumId/pictures', this.getPicturesByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum) //soft delete
  }

  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
*/
  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      const userInfo = request.userInfo
      albumData.creatorId = userInfo.id
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId // '/:cornDog' --> request.params.cornDog
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }


  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const userInfo = request.userInfo
      const album = await albumsService.archiveAlbum(albumId, userInfo)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async getWatchersByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const watchers = await watchersService.getWatchersByAlbumId(albumId)
      response.send(watchers)
    } catch (error) {
      next(error)
    }
  }

  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async getPicturesByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getPicturesByAlbumId(albumId)
      response.send(pictures)
    } catch (error) {
      next(error)
    }
  }
}