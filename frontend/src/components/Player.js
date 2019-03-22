import React, { Component } from 'react'
import { TextInput, ListItem, Box, Flex, Toggle } from "@untappd/components";
import PropTypes from 'prop-types';
import styled from "styled-components";

const JerseyTextInput = styled(TextInput)`
  width: 65px;
  display: inline-block;
  margin: auto 5px;
  min-height: 30px;
`

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

  render() {
    const { index, player } = this.props
    const { name, height, weight, position } = player
    const { jersey_number, starter } = this.state

    return (
      <ListItem backgroundColor={index % 2 === 0 ? '#F5F5F5' : 'auto'}>
        <ListItem.Content>
          <ListItem.Heading>
            { name }
          </ListItem.Heading>
          <ListItem.Info>
            <Flex flexDirection='row' flexWrap='wrap' alignContent='stretch'>
              <Box flex={'50%'}>
                <u>Jersey #:</u>
                <br />
                <JerseyTextInput
                  value={jersey_number}
                  type='number'
                  onChange={this.onJerseyNumberChange}
                  onBlur={this.onJerseyNumberBlur}
                />
              </Box>
              <Box flex={'50%'}>
                <u>Starter:</u>
                <br />
                <Toggle checked={starter} onChange={this.onStarterChange} />
              </Box>
              <Box flex={'50%'}>
                <u>Height:</u> { height }
              </Box>
              <Box flex={'50%'}>
                <u>Weight:</u> { weight }
              </Box>
              <Box flex={'50%'}>
                <u>Position:</u> { position }
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

    this.props.saveStarter(teamId, id, starter,
      () => { this.setState({ starter }) }
    )
  }
}

Player.propTypes = {
  index: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired,
  saveJerseyNumber: PropTypes.func.isRequired,
  saveStarter: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.number,
    position: PropTypes.string,
    jersey_number: PropTypes.number,
    starter: PropTypes.bool,
  }),
};