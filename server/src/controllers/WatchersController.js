import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { watchersService } from "../services/WatchersService.js";

export class WatchersController extends BaseController {
  constructor() {
    super('api/watchers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createWatcher)
  }


  /**
  @param {import("express").Request} request
  @param {import("express").Response} response
  @param {import("express").NextFunction} next
  */
  async createWatcher(request, response, next) {
    try {
      const watcherData = request.body
      const userId = request.userInfo.id
      watcherData.accountId = userId
      const watcher = await watchersService.createWatcher(watcherData)
      response.send(watcher)
    } catch (error) {
      next(error)
    }
  }
}