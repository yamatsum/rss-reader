import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Title,
} from "native-base";
import * as React from "react";

class HeaderComponent extends React.Component {
  render() {
    return (
        <Header>
          // <Left>
          //   <Button transparent>
          //     <Icon name="menu" />
          //   </Button>
          // </Left>
          <Body>
            <Title>新着</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Icon name="heart" />
            </Button>
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
    );
  }
}

export default HeaderComponent;
