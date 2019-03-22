import React, { Component } from 'react'
import { Card, Heading, TextInput, List } from "@untappd/components";
import Player from './Player'

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
            {
              players.map(
                player => (
                  <Player
                    key={`Player-${player.id}`}
                    player={player}
                    teamId={id}
                    saveJerseyNumber={this.props.saveJerseyNumber}
                    saveStarter={this.props.saveStarter}
                  />
                )
              )
            }
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
}