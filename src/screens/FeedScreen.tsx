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
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";
// import HeaderComponent from "../components/HeaderComponent";
import ListComponent from "../components/ListComponent";
import { StyleSheet, ScrollView } from "react-native";
import * as rssParser from "react-native-rss-parser";
import { Actions } from "react-native-router-flux";

export default class FeedScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [{ title: "fuga" }],
      isReady: false
    };
  }

  async loadFeed() {
    const response = await fetch(this.props.rssList[this.props.rssIndex]);
    const rss = await rssParser.parse(await response.text());

    for (const item of rss.items) {
      item.feedTitle = rss.title;
    }
    this.setState({
      rss: rss.items,
      isReady: true
    });
  }

  componentDidMount() {
    this.loadFeed();
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
