import * as React from "react";
import {
  WebView,
  AsyncStorage,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class ArticleScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  _storeData = async (item) => {
    try {
      await AsyncStorage.setItem('bookmarks', JSON.stringify(item));
      console.log('saved')
    } catch (error) {
      // Error saving data
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => Actions.pop()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Title</Title>
          </Body>
          <Right>
            <Button onPress={() => this._storeData(this.props.rss)} transparent>
              <Icon name='bookmark' />
            </Button>
          </Right>
        </Header>
      <WebView
        source={{uri: this.props.rss.link}}
      />
    </Container>
    )
  }
};

export default ArticleScreen;
