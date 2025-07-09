import { Album } from "./Album.js"

class Watcher {
  constructor(data) {
    this.id = data.id || data._id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}

export class WatcherProfile extends Watcher {
  constructor(data) {
    super(data)
    this.profile = data.profile
  }
}

export class WatcherAlbum extends Watcher {
  constructor(data) {
    super(data)
    this.album = new Album(data.album)
  }
}