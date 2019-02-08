export class Post {
    constructor(id, lastId, name, prior, desc, actors, precon, starter, flow, postcon, notes) {
        this.id = id
        this.lastId = lastId
        this.name = name
        this.prior = prior
        this.desc = desc
        this.actors = actors
        this.precon = precon
        this.starter = starter
        this.flow = flow
        this.postcon = postcon
        this.notes = notes
    }
}