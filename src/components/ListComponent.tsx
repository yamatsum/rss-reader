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

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  container: {
    flex: 1
  },
  stayElevated: {
    width: 380,
    height: 100,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row"
  },
  img: {
    width: 105,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden"
  }
});

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
    this.setRss({ items: [] });
    this.setState({ refreshing: true });
    this.loadFeed();
    this.setState({ refreshing: false });

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

  loadFeed() {
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

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    return (
      // <Content
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={this.state.refreshing}
      //       onRefresh={this._onRefresh}
      //     />
      //   }
      // >
      <Swiper horizontal={false} showsPagination={false}>
        <View style={styles.slide}>
          <FlatList
            data={this.state.rss}
            renderItem={rss => (
              <TouchableOpacity
                onPress={() => {
                  Actions.ArticleScreen({ rss: rss.item });
                }}
                style={styles.container}
              >
                <ElevatedView elevation={20} style={styles.stayElevated}>
                  <View style={styles.img}>
                    <Image
                      style={{ width: 105, height: 100 }}
                      source={{ uri: rss.item.thumbnail }}
                    />
                  </View>
                  <View style={{ flexDirection: "colum" }}>
                    <Text style={{ padding: 10, width: 270 }}>
                      {rss.item.title}
                    </Text>
                    <Text style={{ padding: 10, width: 270 }}>ジョジョ速</Text>
                  </View>
                </ElevatedView>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Second Page</Text>
        </View>
      </Swiper>
      //   <List
      //     dataArray={this.state.rss}
      //     renderRow={rss => (
      //       <ListItem
      //         onPress={() => {
      //           Actions.ArticleScreen({ rss });
      //         }}
      //       >
      //         <Thumbnail square size={80} source={{ uri: rss.thumbnail }} />
      //         <Body>
      //           <Text>{rss.title}</Text>
      //         </Body>
      //       </ListItem>
      //     )}
      //   />
      // </Content>
    );
  }
}

export default ListComponent;
