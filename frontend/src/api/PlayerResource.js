import BaseResource from './BaseResource'

class PlayerResource extends BaseResource {
  update(conferenceId, teamId, playerId, params) {
    const resourceUri =
      `${this.baseURL}/conferences/${conferenceId}/teams/${teamId}/players/${playerId}`;

    return super.put(resourceUri, params);
  }
}

export default PlayerResource