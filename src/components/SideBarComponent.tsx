import * as React from "react";
import { Scene, Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  RefreshControl,
  AsyncStorage,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  List,
  ListItem,
  Icon
} from "native-base";

const styles = StyleSheet.create({
  sidebar: {
    paddingTop: 48,
    marginHorizontal: 4,
    flex: 1,
    backgroundColor: "#F5F6F7"
  },
  sidebarList: {
    padding: 8,
    height: 48,
    // borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 6,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  sidebarListComponent: {
    flexDirection: "row"
  },
  delimiter: {
    height: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  delimiterTop: {
    height: 6,
    borderBottomColor: "#CECECE",
    borderBottomWidth: 0.5,
    width: "80%"
  },
  delimiterBottom: {
    height: 6
  },
  active: {
    backgroundColor: "#E4E5E8"
  },
  sidebarIcon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    flex: 1
  },
  sidebarText: {
    flex: 6,
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "900",
    color: "#303336"
  }
});

export default class SideBarComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 1
    };
  }

  makeRssList() {
    let rssList = [];
    this.props.rssList.forEach((rss, index) => {
      rssList.push(
        <TouchableOpacity
          key={index}
          style={[
            styles.sidebarList,
            this.state.currentScreen === index + 3 ? styles.active : {}
          ]}
          onPress={() => {
            this.props.onChangeIndex(index);
            Actions.drawerClose();
            Actions.FeedScreen();
            Actions.refresh({ key: index });
            this.setState({ currentScreen: index + 3 });
          }}
        >
          <View style={styles.sidebarListComponent}>
            <View style={styles.sidebarIcon}>
              <Icon
                type="Feather"
                name="file-text"
                style={{ fontSize: 16, color: "#303336" }}
              />
            </View>
            <Text style={styles.sidebarText}>{rss.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return rssList;
  }

  render() {
    return (
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={[
            styles.sidebarList,
            this.state.currentScreen === 1 ? styles.active : {}
          ]}
          onPress={() => {
            Actions.drawerClose();
            Actions.TopScreen();
            this.setState({ currentScreen: 1 });
          }}
        >
          <View style={styles.sidebarListComponent}>
            <View style={styles.sidebarIcon}>
              <Icon
                type="Foundation"
                name="rss"
                style={{ fontSize: 16, color: "#303336" }}
              />
            </View>
            <Text style={styles.sidebarText}>最近の記事</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sidebarList,
            this.state.currentScreen === 2 ? styles.active : {}
          ]}
          onPress={() => {
            Actions.drawerClose();
            Actions.BookmarkScreen();
            this.setState({ currentScreen: 2 });
          }}
        >
          <View style={styles.sidebarListComponent}>
            <View style={styles.sidebarIcon}>
              <Icon
                type="Feather"
                name="bookmark"
                style={{ fontSize: 16, color: "#303336" }}
              />
            </View>
            <Text style={styles.sidebarText}>お気に入り</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.delimiter}>
          <View style={styles.delimiterTop} />
          <View style={styles.delimiterBottom} />
        </View>
        {this.makeRssList()}
        <View style={styles.delimiter}>
          <View style={styles.delimiterTop} />
          <View style={styles.delimiterBottom} />
        </View>
        <TouchableOpacity
          style={[
            styles.sidebarList,
            this.state.currentScreen === 5 ? styles.active : {}
          ]}
          onPress={() => {}}
        >
          <View style={styles.sidebarListComponent}>
            <View style={styles.sidebarIcon}>
              <Icon
                type="Feather"
                name="help-circle"
                style={{ fontSize: 16, color: "#303336" }}
              />
            </View>
            <Text style={styles.sidebarText}>ご意見・ご要望</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sidebarList,
            this.state.currentScreen === 6 ? styles.active : {}
          ]}
          onPress={() => {}}
        >
          <View style={styles.sidebarListComponent}>
            <View style={styles.sidebarIcon}>
              <Icon
                type="Feather"
                name="settings"
                style={{ fontSize: 16, color: "#303336" }}
              />
            </View>
            <Text style={styles.sidebarText}>その他</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
