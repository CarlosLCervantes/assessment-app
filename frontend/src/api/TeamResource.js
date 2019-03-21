import BaseResource from './BaseResource'

class TeamResource extends BaseResource {
  update(conferenceId, teamId, params) {
    const resourceUri = `${this.baseURL}/conferences/${conferenceId}/teams/${teamId}`;

    return super.put(resourceUri, params);
  }
}

export default TeamResource