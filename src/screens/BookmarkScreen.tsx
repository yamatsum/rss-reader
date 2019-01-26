import {
  Container,
  Tab,
  Tabs,
  View,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import * as React from "react";
import { RefreshControl, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import ListComponent from "../containers/ListComponent";

class BookmarkScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [{ title: "fuga" }],
      isReady: false
    };
  }

  fetchData = () => {
    return "ok";
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
      this.setState({ rss: JSON.parse(value), isReady: true });
    });
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <ListComponent rss={this.state.rss} isReady={this.state.isReady} />
        </View>
      </Container>
    );
  }
}

export default BookmarkScreen;
