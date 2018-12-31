import { Body, Content, List, ListItem, Thumbnail, Text } from "native-base";
import * as React from "react";
import { RefreshControl, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

class BookmarkScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [],
      refreshing: false
    };
  }

  fetchData = () => {
    return "ok";
  };

  _onRefresh = async () => {
    // this.setState({ refreshing: true });
    // this.setState({ refreshing: false });
    // this.fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
    // try {
    //   const value = await AsyncStorage.getItem("bookmarks");
    //   if (value !== null) {
    //     // We have data!!
    //     console.log(value);
    //   }
    // } catch (error) {
    // Error retrieving data
    // }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("bookmarks");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async componentWillMount() {
    await this._retrieveData().then(value => {
      this.setState({ rss: JSON.parse(value) });
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

export default BookmarkScreen;
