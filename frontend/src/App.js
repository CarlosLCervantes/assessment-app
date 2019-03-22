import React, { Component } from 'react'
import { Box, Heading } from '@untappd/components'
import Team from './components/Team'
import ConferenceResource from './api/ConferenceResource'
import TeamResource from './api/TeamResource'
import PlayerResource from './api/PlayerResource'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
    }

    this.saveTeamScore = this.saveTeamScore.bind(this)
    this.savePlayerJerseyNumber = this.savePlayerJerseyNumber.bind(this)
    this.savePlayerStarter = this.savePlayerStarter.bind(this)

    this.playerResource = new PlayerResource()
  }

  fetchData() {
    const conferenceResource = new ConferenceResource()

    conferenceResource.fetchAll()
      .then(data => {
        this.setState({ conference: data.conference } )
      })
      .catch((error) => {
        throw error; // TODO: something better here?
      });
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { conference } = this.state

    if (conference === null) {
      return <h3>loading</h3>
    }

    const { teams } = conference

    return (
      <Box className="App" mx={12} my={5}>
        <Heading>
          {conference.short_name} ({conference.name})
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
    const teamResource = new TeamResource()
    const { id: conferenceId } = this.state.conference

    teamResource.update(conferenceId, teamId, scores)
  }

  savePlayerJerseyNumber(teamId, playerId, jersey_number) {
    const { id: conferenceId } = this.state.conference

    this.playerResource.update(conferenceId, teamId, playerId, { jersey_number })
  }

  savePlayerStarter(teamId, playerId, starter) {
    const { id: conferenceId } = this.state.conference

    this.playerResource.update(conferenceId, teamId, playerId, { starter })
  }
}

export default App
