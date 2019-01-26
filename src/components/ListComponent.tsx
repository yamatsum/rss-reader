import { Body, Content, List, ListItem, Thumbnail, Text } from "native-base";
import * as React from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  AsyncStorage,
  FlatList,
  Image,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";
import Swiper from "react-native-swiper";
import ElevatedView from "react-native-elevated-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import * as rssParser from "react-native-rss-parser";
import { parse } from "node-html-parser";
import CustomPlaceholder from "../components/CustomPlaceholder";

const ITEM_COUNT_PAGE = isIphoneX() ? 5 : 4;

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
    flex: 1,
    borderRadius: 10,
    margin: 6
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
  },
  feedBox: {
    flex: 1,
    // borderWidth: 0.5,
    flexDirection: "row"
  },
  feedImageArea: {
    flex: 2
  },
  feedImage: {
    flex: 1,
    margin: 12,
    borderRadius: 10,
    borderWidth: 0.1,
    aspectRatio: 1
  },
  feedTextArea: {
    flex: 5
  },
  feedTextAreaInside: {
    flex: 1,
    marginTop: 12,
    marginLeft: 14,
    marginBottom: 12,
    marginRight: 12
  },
  title: {
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "900",
    color: "#303336",
    lineHeight: 20
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "System",
    fontWeight: "400",
    color: "#949CA6"
  }
});

class ListComponent extends React.Component<any, any> {
  pages = [];

  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false
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
        <View style={{ flex: 1 }} key={i}>
          <View style={{ flex: 7 }}>
            <CustomPlaceholder onReady={this.props.isReady} animate="fade">
              <TouchableHighlight
                key={i + count * ITEM_COUNT_PAGE}
                style={styles.container}
                underlayColor="#E4E5E8"
                onPress={() => {
                  Actions.ArticleScreen({
                    rss: this.props.rss[i + count * ITEM_COUNT_PAGE]
                      ? this.props.rss[i + count * ITEM_COUNT_PAGE]
                      : "hoge"
                  });
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.feedBox}>
                    <View style={styles.feedImageArea}>
                      <Image
                        style={styles.feedImage}
                        source={{
                          uri: this.getThumbnail(
                            this.props.rss[i + count * ITEM_COUNT_PAGE]
                          )
                        }}
                      />
                    </View>
                    <View style={styles.feedTextArea}>
                      <View style={styles.feedTextAreaInside}>
                        <Text numberOfLines={4} style={styles.title}>
                          {this.props.rss[i + count * ITEM_COUNT_PAGE]
                            ? this.props.rss[i + count * ITEM_COUNT_PAGE].title
                            : "hoge"}
                        </Text>
                        <Text style={styles.subtitle}>
                          {this.props.rss[i + count * ITEM_COUNT_PAGE]
                            ? this.props.rss[i + count * ITEM_COUNT_PAGE]
                                .feedTitle
                            : "hoge"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </CustomPlaceholder>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      );
    }
    return feedItems;
  }

  render() {
    for (
      let counter = 0;
      counter < Math.ceil(this.props.rss.length / ITEM_COUNT_PAGE);
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
