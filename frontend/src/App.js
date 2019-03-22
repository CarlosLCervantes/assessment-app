import React, { Component } from 'react'
import { Box, Heading, Alert } from '@untappd/components'
import Team from './components/Team'
import ConferenceResource from './api/ConferenceResource'
import TeamResource from './api/TeamResource'
import PlayerResource from './api/PlayerResource'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
      error: true
    }

    this.saveTeamScore = this.saveTeamScore.bind(this)
    this.savePlayerJerseyNumber = this.savePlayerJerseyNumber.bind(this)
    this.savePlayerStarter = this.savePlayerStarter.bind(this)

    this.conferenceResource = new ConferenceResource()
    this.playerResource = new PlayerResource()
    this.teamResource = new TeamResource()
  }

  fetchData() {
    this.conferenceResource.fetchAll()
      .then(data => {
        this.setState({ conference: data.conference } )
        this.clearError()
      })
      .catch(() => {
        this.setError()
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { conference, error } = this.state

    if (conference === null) {
      return <h3>loading</h3>
    }

    const { teams } = conference

    return (
      <Box className="App" mx={12} my={5}>
        { error && <Alert color='red' hasIcon={true}>There was an issue. Please Try Again</Alert> }
        <Heading mb={3}>
          { conference.short_name } ({ conference.name })
        </Heading>

        {teams.map(team => (
          <Team
            key={`Team-${team.id}`}
            team={team}
            saveTeamScore={this.saveTeamScore}
            saveJerseyNumber={this.savePlayerJerseyNumber}
            saveStarter={this.savePlayerStarter}
          />
        ))}
      </Box>
    )
  }

  saveTeamScore(teamId, scores) {
    const { id: conferenceId } = this.state.conference

    this.teamResource.update(conferenceId, teamId, scores)
      .then(() => { this.clearError() })
      .catch(() => { this.setError() })
  }

  savePlayerJerseyNumber(teamId, playerId, jersey_number) {
    const { id: conferenceId } = this.state.conference

    this.playerResource.update(conferenceId, teamId, playerId, { jersey_number })
      .then(() => { this.clearError() })
      .catch(() => { this.setError() })
  }

  savePlayerStarter(teamId, playerId, starter, afterSave) {
    const { id: conferenceId } = this.state.conference

    this.playerResource.update(conferenceId, teamId, playerId, { starter })
      .then(() => {
        this.clearError()
        afterSave()
      })
      .catch(() => { this.setError() })
  }

  setError() {
    this.setState({ error: true} )
  }

  clearError() {
    this.setState({ error: false })
  }
}

export default App
