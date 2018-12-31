import * as React from "react";
import { WebView, AsyncStorage, Share } from "react-native";
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
        <Header>
          <Left>
            <Button onPress={() => Actions.pop()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.rss.author}</Title>
          </Body>
          <Right>
            <Button onPress={() => this._storeData(this.props.rss)} transparent>
              {this.state.existFlag ? (
                <Icon type="FontAwesome" name="bookmark" />
              ) : (
                <Icon type="FontAwesome" name="bookmark-o" />
              )}
            </Button>
          </Right>
        </Header>
        <WebView
          ref={r => (this.webView.ref = r)}
          source={{ uri: this.props.rss.links[0].url }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
        <Footer>
          <Left style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                this.webView.ref.goBack();
              }}
              transparent
              disabled={!this.state.canGoBack}
            >
              <Icon name="arrow-back" />
            </Button>
            <Button
              onPress={() => {
                this.webView.ref.goForward();
              }}
              transparent
              disabled={!this.state.canGoForward}
            >
              <Icon name="arrow-forward" />
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={() => this.shareFeed(this.props.rss)}>
              <Icon type="Feather" name="share" />
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

export default ArticleScreen;
