import React, { Component } from 'react'
import { Card, Heading, TextInput, List, ListItem, Box, Flex } from "@untappd/components";

export default class Team extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wins: props.team.wins,
      losses: props.team.losses,
    }

    this.onWinScoreEdited = this.onWinScoreEdited.bind(this)
    this.onLossScoreEdited = this.onLossScoreEdited.bind(this)
    this.onScoreBlur = this.onScoreBlur.bind(this)
  }

  render() {
    const { id, name, mascot, players, coach } = this.props.team
    const { wins, losses } = this.state

    return (
      <Card key={`Team-${id}`} mb={3}>
        <Card.Header>
          <Heading>
            {name}
            <div>
              {mascot} {coach}
            </div>
          </Heading>

          <div>
            Wins:
            <TextInput
              value={wins}
              type='number'
              onChange={this.onWinScoreEdited}
              onBlur={this.onScoreBlur}
            />
            Losses:
            <TextInput
              value={losses}
              type='number'
              onChange={this.onLossScoreEdited}
              onBlur={this.onScoreBlur}
            />
          </div>
        </Card.Header>
        <Card.Content>
          <List>
            { players.map(player => ( this.renderPlayer(player) ) ) }
          </List>
        </Card.Content>
      </Card>
    )
  }

  onWinScoreEdited(e) {
    this.setState({ wins: Number(e.target.value) })
  }

  onLossScoreEdited(e) {
    this.setState({ losses: Number(e.target.value) })
  }

  onScoreBlur() {
    const { wins, losses } = this.state

    this.props.saveTeamScore(this.props.team.id, { wins, losses })
  }

  renderPlayer(player) {
    const { id, name, jersey_number, height, weight, position, starter } = player

    return (
      <ListItem key={`Player-${id}`}>
        <ListItem.Content>
          <ListItem.Heading>
            { name }
          </ListItem.Heading>
          <ListItem.Info>
              <Flex flexDirection='row' flexWrap='wrap' alignContent='stretch'>
                <Box flex={'50%'}>
                  <strong>Jersey #:</strong>
                  <TextInput
                    value={jersey_number}
                    type='number'
                  /> {' '}
                </Box>
                <Box flex={'50%'}>
                  <strong>Height:</strong> { height } {' '}
                </Box>
                <Box flex={'50%'}>
                  <strong>Weight:</strong> { weight } {' '}
                </Box>
                <Box flex={'50%'}>
                  <strong>Position:</strong> { position } {' '}
                </Box>
                <Box flex={'50%'}>
                  <strong>Starter:</strong> { starter ? 'Yes' : 'No' }
                </Box>
              </Flex>
          </ListItem.Info>
        </ListItem.Content>
      </ListItem>
    )
  }
}