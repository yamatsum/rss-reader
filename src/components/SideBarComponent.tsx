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

  makeRssList() {
    let rssList = [];
    this.props.rssList.forEach((rss, index) => {
      rssList.push(
        <ListItem
          key={index}
          onPress={() => {
            this.props.onChangeIndex(index);
            Actions.drawerClose();
            Actions.FeedScreen();
            Actions.refresh({ key: index });
          }}
        >
          <Text>{rss.title}</Text>
        </ListItem>
      );
    });

    return rssList;
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem
              key="new"
              onPress={() => {
                Actions.drawerClose();
                Actions.TopScreen();
              }}
            >
              <Text>最新の記事</Text>
            </ListItem>
            <ListItem
              key="bookmark"
              onPress={() => {
                Actions.drawerClose();
                Actions.BookmarkScreen();
              }}
            >
              <Text>あとで読む</Text>
            </ListItem>
            <ListItem key="divider1" itemDivider />
            {this.makeRssList()}
            <ListItem key="divider2" itemDivider />
            <ListItem key="opinion">
              <Text>ご意見・ご要望</Text>
            </ListItem>
            <ListItem key="other">
              <Text>その他</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
