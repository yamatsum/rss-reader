import * as React from "react";
import { Container, Header, Content, Button, Text } from 'native-base';

export default class SideBarComponent extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button>
            <Text>Click Me!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
