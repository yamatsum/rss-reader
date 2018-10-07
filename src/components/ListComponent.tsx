import { Body, Content, List, ListItem, Thumbnail, Text } from "native-base";
import * as React from "react";
import { RefreshControl, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

class ListComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [],
      refreshing: false
    };
    this.setRss = this.setRss.bind(this);
  }

  setRss(json: any) {
    this.setState({
      rss: json.items
    });
  }

  fetchData = () => {
    console.log("hoge");
    return "ok";
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    console.log("hoge");
    this.setState({ refreshing: false });
    // this.fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });

    try {
      const value = await AsyncStorage.getItem("bookmarks");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillMount() {
    const parseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    const rssUrl = "http://jojosoku.com/feed";
    fetch(parseUrl + rssUrl)
      .then(response => response.json())
      .then(json => {
        if (json.status === "ok") {
          this.setRss(json);
        } else {
          console.log("failed");
        }
      });
  }

  render() {
    return (
      <Content
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <List
          dataArray={this.state.rss}
          renderRow={rss => (
            <ListItem
              onPress={() => {
                Actions.ArticleScreen({ rss });
              }}
            >
              <Thumbnail square size={80} source={{ uri: rss.thumbnail }} />
              <Body>
                <Text>{rss.title}</Text>
              </Body>
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

export default ListComponent;
