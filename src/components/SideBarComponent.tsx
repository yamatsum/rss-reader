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
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem onPress={() => Actions.TopScreen()}>
              <Text>最新の記事</Text>
            </ListItem>
            <ListItem onPress={() => Actions.BookmarkScreen()}>
              <Text>あとで読む</Text>
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <Text>ジョジョチャンネル</Text>
            </ListItem>
            <ListItem>
              <Text>ジョジョチャンネル</Text>
            </ListItem>
            <ListItem>
              <Text>ジョジョチャンネル</Text>
            </ListItem>
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
