import React, { Component } from 'react'
import { Card, Heading, TextInput, List, Text } from "@untappd/components"
import Player from './Player'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ScoreTextInput = styled(TextInput)`
  width: 80px;
  display: inline-block;
  margin: 5px 5px;
  min-height: 30px;
`

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
            <Text fontSize={2}>
              {mascot} - {coach}
            </Text>
          </Heading>

          <div>
            <Text display='inline-block' width={60}>Wins:</Text>
            <ScoreTextInput
              value={wins}
              type='number'
              onChange={this.onWinScoreEdited}
              onBlur={this.onScoreBlur}
            />
            <br />
            <Text display='inline-block' width={60}>Losses:</Text>
            <ScoreTextInput
              value={losses}
              type='number'
              onChange={this.onLossScoreEdited}
              onBlur={this.onScoreBlur}
            />
          </div>
        </Card.Header>
        <Card.Content p={0}>
          <List>
            {
              players.map(
                (player, index) => (
                  <Player
                    key={`Player-${player.id}`}
                    player={player}
                    teamId={id}
                    index={index}
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

Team.propTypes = {
  saveTeamScore: PropTypes.func.isRequired,
  team : PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mascot: PropTypes.string,
    coach: PropTypes.string,
    players: PropTypes.array,
  }),
}