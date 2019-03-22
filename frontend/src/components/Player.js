import React, { Component } from 'react'
import { TextInput, ListItem, Box, Flex, Toggle } from "@untappd/components";

export default class Player extends Component {
  constructor(props) {
    super(props)

    const { jersey_number, starter } = this.props.player

    this.state = {
      jersey_number,
      starter,
    }

    this.onJerseyNumberChange = this.onJerseyNumberChange.bind(this)
    this.onJerseyNumberBlur = this.onJerseyNumberBlur.bind(this)
    this.onStarterChange = this.onStarterChange.bind(this)
  }

  render(player) {
    const { name, height, weight, position } = this.props.player
    const { jersey_number, starter } = this.state

    return (
      <ListItem>
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
                  onChange={this.onJerseyNumberChange}
                  onBlur={this.onJerseyNumberBlur}
                /> {' '}
              </Box>
              <Box flex={'50%'}>
                <strong>Height:</strong> { height }
              </Box>
              <Box flex={'50%'}>
                <strong>Weight:</strong> { weight }
              </Box>
              <Box flex={'50%'}>
                <strong>Position:</strong> { position }
              </Box>
              <Box flex={'50%'}>
                <strong>Starter:</strong>
                <Toggle checked={starter} onChange={this.onStarterChange} />
              </Box>
            </Flex>
          </ListItem.Info>
        </ListItem.Content>
      </ListItem>
    )
  }

  onJerseyNumberChange(e) {
    this.setState({ jersey_number: Number(e.target.value) })
  }

  onJerseyNumberBlur(e) {
    const { teamId, player: { id } } = this.props
    const { jersey_number } = this.state

    this.props.saveJerseyNumber(teamId, id, jersey_number)
  }

  onStarterChange() {
    const { teamId, player: { id } } = this.props
    const starter = !this.state.starter

    this.props.saveStarter(teamId, id, starter)

    // TODO: this is bad
    this.setState({ starter })
  }
}