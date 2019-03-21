import React, { Component } from 'react'
import { Box, Heading } from '@untappd/components'
import Team from './components/Team'
import ConferenceResource from './api/ConferenceResource'
import TeamResource from './api/TeamResource'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
    }

    this.saveTeamScore = this.saveTeamScore.bind(this)
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
          <Team team={team} saveTeamScore={this.saveTeamScore} />
        ))}
      </Box>
    )
  }

  saveTeamScore(teamId, scores) {
    const teamResource = new TeamResource()
    teamResource.update(this.state.conference.id, teamId, scores)
  }
}

export default App
