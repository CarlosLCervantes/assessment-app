import React, { Component } from 'react'
import { Card, Heading, TextInput, List, ListItem, Box, Flex } from "@untappd/components";

export default class Team extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, name, mascot, players, coach, wins, losses } = this.props.team

    return (
      <Card key={id} mb={3}>
        <Card.Header>
          <Heading>
            {name}
            <div>
              {mascot} {coach}
            </div>
          </Heading>

          <div>
            Wins: <TextInput value={wins} />
            Losses: <TextInput value={losses} />
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

  renderPlayer(player) {
    const { name, jersey_number, height, weight, position, starter } = player

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
                  <TextInput  value={jersey_number} /> {' '}
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
                  <strong>Starter:</strong> { starter } {' '}
                </Box>
              </Flex>
          </ListItem.Info>
        </ListItem.Content>
      </ListItem>
    )
  }

}