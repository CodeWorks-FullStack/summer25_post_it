export class Album {
  constructor(data) {
    this.title = data.title
    this.coverImg = data.coverImg
    this.archived = data.archived
    this.category = data.category
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
    this.id = data.id || data._id
  }
}