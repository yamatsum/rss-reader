import {
  Body,
  List,
  ListItem,
  Thumbnail,
  Text,
} from "native-base";
import * as React from "react";
import {
  Actions,
} from 'react-native-router-flux';

class ListComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: []
    }
    this.setRss = this.setRss.bind(this);
  }

  setRss(json: any) {
    this.setState({
      rss: json.items
    });
  }

  componentWillMount() {
    const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const rssUrl = 'http://jojosoku.com/feed';
    fetch(parseUrl + rssUrl)
    .then(response => response.json())
    .then((json) => {
      if (json.status === 'ok') {
        console.log(json);
        this.setRss(json);
      }else {
        console.log("failed");
      }
    });
  }

  render() {
    return (
      <List dataArray={this.state.rss}
        renderRow={(rss) =>
          <ListItem onPress={() => {Actions.ArticleScreen({ link: rss.link })}}>
            <Thumbnail square size={80} source={{ uri: rss.thumbnail }} />
            <Body>
              <Text>{ rss.title }</Text>
            </Body>
          </ListItem>
        }>
      </List>
    );
  }
}

export default ListComponent;
