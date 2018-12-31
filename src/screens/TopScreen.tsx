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

const ITEM_COUNT_PAGE = 6;

export default class TopScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      rss: [{ title: "fuga" }],
      itemCount: ITEM_COUNT_PAGE
    };
    this.setRss = this.setRss.bind(this);
  }

  setRss(rss: any) {
    this.setState({
      rss: rss.items,
      itemCount: rss.items.length
    });
  }

  async loadFeed() {
    for (const r of this.props.rssList) {
      if (r.registrationFlag) {
        const response = await fetch(r.url);
        const rss = await rssParser.parse(await response.text());

        for (const item of rss.items) {
          item.feedTitle = rss.title;
        }
        this.setRss(rss);
      }
    }
  }

  componentDidMount() {
    this.loadFeed();
    console.log(this.state.rss);
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <ListComponent
            rss={this.state.rss}
            itemCount={this.state.itemCount}
          />
        </View>
      </Container>
    );
  }
}
