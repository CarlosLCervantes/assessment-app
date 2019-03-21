import BaseResource from './BaseResource'

class ConferenceResource extends BaseResource {
  fetchAll() {
    const resourceUri = `${this.baseURL}`
    return super.fetch(resourceUri)
  }
}

export default ConferenceResource
