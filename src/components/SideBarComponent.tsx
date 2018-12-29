import * as React from "react";
import { Scene, Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Content,
  Button,
  List,
  ListItem,
  Text
} from "native-base";

export default class SideBarComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.rssList);
  }

  makeRssList() {
    let rssList = [];
    for (const rss of this.props.rssList) {
      rssList.push(
        <ListItem>
          <Text>{rss.title}</Text>
        </ListItem>
      );
    }
    return rssList;
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem
              onPress={() => {
                Actions.drawerClose();
                Actions.TopScreen();
              }}
            >
              <Text>最新の記事</Text>
            </ListItem>
            <ListItem
              onPress={() => {
                Actions.drawerClose();
                Actions.BookmarkScreen();
              }}
            >
              <Text>あとで読む</Text>
            </ListItem>
            <ListItem itemDivider />
            {this.makeRssList()}
            <ListItem itemDivider />
            <ListItem>
              <Text>ご意見・ご要望</Text>
            </ListItem>
            <ListItem>
              <Text>その他</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
