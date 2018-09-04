import * as React from "react";
import {
  Scene,
} from 'react-native-router-flux';
import { Container, Header, Content, Button, List, ListItem, Text } from 'native-base';

export default class SideBarComponent extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem>
              <Text>Today</Text>
            </ListItem>
            <ListItem>
              <Text>Read Later</Text>
            </ListItem>
            <ListItem>
              <Text>Explore</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>PERSONAL FEEDS</Text>
            </ListItem>
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
