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
import ListComponent from "../containers/ListComponent";
import { StyleSheet, ScrollView } from "react-native";
import * as rssParser from "react-native-rss-parser";

export default class TopScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [{ title: "fuga" }]
    };
  }

  async loadFeed() {
    const rssItems = [];
    for (const r of this.props.rssList) {
      if (r.registrationFlag) {
        const response = await fetch(r.url);
        console.log(response);
        const rss = await rssParser.parse(await response.text());

        for (const item of rss.items) {
          item.feedTitle = rss.title;
        }
        Array.prototype.push.apply(rssItems, rss.items);
      }
    }
    this.setState({
      rss: rssItems
    });
  }

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <ListComponent rss={this.state.rss} />
        </View>
      </Container>
    );
  }
}
