export class WatcherProfile {
  constructor(data) {
    this.id = data.id || data._id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.profile = data.profile
  }
}