import { Body, Content, List, ListItem, Thumbnail, Text } from "native-base";
import * as React from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  AsyncStorage,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import Swiper from "react-native-swiper";
import ElevatedView from "react-native-elevated-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import * as rssParser from "react-native-rss-parser";
import { parse } from "node-html-parser";

const ITEM_COUNT_PAGE = 6;

const styles = StyleSheet.create({
  slide: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  list: {
    flex: 1
  },
  container: {
    flex: 1
  },
  stayElevated: {
    // width: 380,
    // height: 100,
    // margin: 10,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    margin: 10
  },
  img: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    aspectRatio: 1
  }
});

class ListComponent extends React.Component<any, any> {
  pages = [];

  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  getThumbnail(rssItem: any) {
    if (rssItem && rssItem.enclosures && rssItem.enclosures[0]) {
      return rssItem.enclosures[0].url;
    } else if (
      rssItem &&
      rssItem.content &&
      rssItem.content.match(/\"(http:[^\"]*\.png)\"/) &&
      rssItem.content.match(/\"(http:[^\"]*\.png)\"/)[1]
    ) {
      if (rssItem.content.match(/\"(http:[^\"]*\.png)\"/)) {
        return rssItem.content.match(/\"(http:[^\"]*\.png)\"/)[1];
      }
    } else {
      return "hoge";
    }
  }

  setFeedItem(count: number) {
    let feedItems = [];
    for (let i = 0; i < ITEM_COUNT_PAGE; i++) {
      feedItems.push(
        <TouchableOpacity
          key={i + count * ITEM_COUNT_PAGE}
          style={styles.container}
          onPress={() => {
            Actions.ArticleScreen({
              rss: this.props.rss[i + count * ITEM_COUNT_PAGE]
                ? this.props.rss[i + count * ITEM_COUNT_PAGE]
                : "hoge"
            });
          }}
        >
          <ElevatedView elevation={20} style={styles.stayElevated}>
            <View style={styles.img}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: this.getThumbnail(
                    this.props.rss[i + count * ITEM_COUNT_PAGE]
                  )
                }}
              />
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ padding: 10, flex: 3, fontWeight: "bold" }}>
                {this.props.rss[i + count * ITEM_COUNT_PAGE]
                  ? this.props.rss[i + count * ITEM_COUNT_PAGE].title
                  : "hoge"}
              </Text>
              <Text style={{ padding: 10, flex: 1, color: "gray" }}>
                {this.props.rss[i + count * ITEM_COUNT_PAGE]
                  ? this.props.rss[i + count * ITEM_COUNT_PAGE].feedTitle
                  : "hoge"}
              </Text>
            </View>
          </ElevatedView>
        </TouchableOpacity>
      );
    }
    return feedItems;
  }

  componentDidMount() {
    console.log(this.props.rss.length);
  }

  render() {
    for (
      let counter = 0;
      counter < Math.ceil(this.props.itemCount / ITEM_COUNT_PAGE);
      counter++
    ) {
      this.pages[counter] = (
        <View key={counter} style={styles.slide}>
          {this.setFeedItem(counter)}
        </View>
      );
    }

    return (
      <Swiper horizontal={false} showsPagination={false} loop={false}>
        {this.pages}
      </Swiper>
    );
  }
}

export default ListComponent;
