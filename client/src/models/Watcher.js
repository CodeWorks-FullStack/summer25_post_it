import { Album } from "./Album.js"

// NOTE base model that will only be inherited from
class Watcher {
  constructor(data) {
    this.id = data.id || data._id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}

// NOTE sometimes the watcher has a profile
export class WatcherProfile extends Watcher {
  constructor(data) {
    super(data)
    this.profile = data.profile
  }
}

// NOTE sometimes the watcher has an album
export class WatcherAlbum extends Watcher {
  constructor(data) {
    super(data)
    this.album = new Album(data.album)
  }
}