import * as React from "react";
import {
  StyleSheet,
  Text,
  WebView,
  AsyncStorage,
  Share,
  View,
  Platform
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Footer
} from "native-base";
import { BlurView } from "expo";

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    borderBottomWidth: 1
    // backgroundColor: "rgba(0,0,0,0.2)"
  },
  overlayFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderBottomWidth: 1
    // backgroundColor: "rgba(0,0,0,0.2)"
  },
  header: {
    flex: 1,
    flexDirection: "row"
  },
  leftHeader: {
    flex: 1
  },
  centerHeader: {
    flex: 3
  },
  rightHeader: {
    flex: 1
  }
});

class ArticleScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      existFlag: false,
      bookmarks: [],
      canGoBack: false,
      canGoForward: false
    };
  }

  async componentDidMount() {
    await this._retrieveData().then(value => {
      this.setState({ bookmarks: JSON.parse(value) });
    });

    await this.checkExist(this.state.bookmarks, this.props.rss.title);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("bookmarks");
      if (value !== null) {
        // We have data!!
        return value;
      } else {
        return "[]";
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  checkExist(bookmarks: Array<Object>, title: string) {
    bookmarks.forEach(b => {
      if (b.title == title) {
        this.setState({ existFlag: true });
      }
    });
  }

  deleteItem(bookmarks, title) {
    return new Promise((resolve, reject) => {
      bookmarks.some((v, i) => {
        if (v.title == title) {
          bookmarks.splice(i, 1);
          resolve(bookmarks);
        }
      });
    });
  }

  _storeData = async item => {
    const jsonBookmarks = this.state.bookmarks;

    try {
      if (jsonBookmarks.length !== 0 && !this.state.existFlag) {
        jsonBookmarks.push(item);
        await AsyncStorage.setItem("bookmarks", JSON.stringify(jsonBookmarks));
        this.setState({ existFlag: true });
      } else if (jsonBookmarks.length !== 0 && this.state.existFlag) {
        await AsyncStorage.setItem(
          "bookmarks",
          JSON.stringify(await this.deleteItem(jsonBookmarks, item.title))
        );
        this.setState({ existFlag: false });
      } else {
        await AsyncStorage.setItem("bookmarks", JSON.stringify([item]));
        this.setState({ existFlag: true });
      }
    } catch (error) {
      // Error saving data
    }
  };

  shareFeed(rss: any) {
    Share.share(
      {
        // message:
        //   "BAM: we're helping your business with awesome React Native apps",
        // url: "http://bam.tech",
        url: rss.links[0].url,
        // title: "Wow, did you see that?"
        title: rss.title
      },
      {
        // Android only:
        dialogTitle: "Share BAM goodness",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
    return;
  }

  webView = {
    ref: null
  };

  onNavigationStateChange(navState) {
    // var event = navState.url.split('#')[1]
    // var data = navState.title

    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward
    });
    // if (event == 'resize') {
    //   this.setState({ height: data })
    // }
  }

  render() {
    return (
      <Container>
        <WebView
          ref={r => (this.webView.ref = r)}
          source={{ uri: this.props.rss.links[0].url }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          contentInset={{ top: 64 }}
        />
        <BlurView tint="light" intensity={80} style={styles.overlay}>
          <View style={{ height: 20 }} />
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <Button onPress={() => Actions.pop()} transparent>
                <Icon name="arrow-back" style={{ color: "#303336" }} />
              </Button>
            </View>
            <View style={styles.centerHeader} />
            <View style={styles.rightHeader}>
              <Button
                onPress={() => this._storeData(this.props.rss)}
                transparent
                style={{ alignSelf: "flex-end" }}
              >
                {this.state.existFlag ? (
                  <Icon
                    type="FontAwesome"
                    name="bookmark"
                    style={{ color: "#303336" }}
                  />
                ) : (
                  <Icon
                    type="FontAwesome"
                    name="bookmark-o"
                    style={{ color: "#303336" }}
                  />
                )}
              </Button>
            </View>
          </View>
        </BlurView>
        <BlurView tint="light" intensity={80} style={styles.overlayFooter}>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <Button
                onPress={() => this.webView.ref.goBack()}
                disabled={!this.state.canGoBack}
                transparent
              >
                <Icon
                  name="arrow-back"
                  style={
                    this.state.canGoBack
                      ? { color: "#303336" }
                      : { color: "#E4E5E8" }
                  }
                />
              </Button>
            </View>
            <View style={styles.leftHeader} />
            <View style={styles.leftHeader}>
              <Button
                onPress={() => this.webView.ref.goForward()}
                disabled={!this.state.canGoForward}
                transparent
              >
                <Icon
                  name="arrow-forward"
                  style={
                    this.state.canGoForward
                      ? { color: "#303336" }
                      : { color: "#E4E5E8" }
                  }
                />
              </Button>
            </View>
            <View style={styles.centerHeader} />
            <View style={styles.rightHeader}>
              <Button
                style={{ alignSelf: "flex-end" }}
                onPress={() => this.shareFeed(this.props.rss)}
                transparent
              >
                <Icon
                  type="Feather"
                  name="share"
                  style={{ color: "#303336" }}
                />
              </Button>
            </View>
          </View>
        </BlurView>
      </Container>
    );
  }
}

export default ArticleScreen;
