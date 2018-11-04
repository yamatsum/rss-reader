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
      rss: [{ title: "fuga" }],
      refreshing: false,
      itemCount: ITEM_COUNT_PAGE
    };
    this.setRss = this.setRss.bind(this);
  }

  setRss(json: any) {
    console.log("setrss");
    this.setState({
      rss: json.items,
      itemCount: json.items.length
    });
  }

  fetchData = () => {
    return "ok";
  };

  _onRefresh = async () => {
    this.setRss({ items: [] });
    this.setState({ refreshing: true });
    this.loadFeed();
    this.setState({ refreshing: false });

    try {
      const value = await AsyncStorage.getItem("bookmarks");
      if (value !== null) {
        // We have data!!
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  loadFeed() {
    console.log("load");
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

  setFeedItem(count: number) {
    let feedItems = [];
    for (let i = 0; i < ITEM_COUNT_PAGE; i++) {
      feedItems.push(
        <TouchableOpacity
          key={i + count * ITEM_COUNT_PAGE}
          style={styles.container}
          onPress={() => {
            Actions.ArticleScreen({
              rss: this.state.rss[i + count * ITEM_COUNT_PAGE]
                ? this.state.rss[i + count * ITEM_COUNT_PAGE]
                : "hoge"
            });
          }}
        >
          <ElevatedView elevation={20} style={styles.stayElevated}>
            <View style={styles.img}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: this.state.rss[i + count * ITEM_COUNT_PAGE]
                    ? this.state.rss[i + count * ITEM_COUNT_PAGE].thumbnail
                    : "hoge"
                }}
              />
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ padding: 10, flex: 3, fontWeight: "bold" }}>
                {this.state.rss[i + count * ITEM_COUNT_PAGE]
                  ? this.state.rss[i + count * ITEM_COUNT_PAGE].title
                  : "hoge"}
              </Text>
              <Text style={{ padding: 10, flex: 1, color: "gray" }}>
                ジョジョ速
              </Text>
            </View>
          </ElevatedView>
        </TouchableOpacity>
      );
    }
    return feedItems;
  }

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    for (
      let counter = 0;
      counter < Math.ceil(this.state.itemCount / ITEM_COUNT_PAGE);
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
