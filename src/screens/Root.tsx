/* tslint:disable-next-line */
import * as React from "react";
import { StyleSheet } from "react-native";
import { Scene, Router, Actions, Drawer } from "react-native-router-flux";
import { Icon } from "native-base";
import { createStore } from "redux";
import { Provider } from "react-redux";

import TopScreen from "../containers/TopScreen";
import ArticleScreen from "./ArticleScreen";
// import DrawerScreen from './DrawerScreen';
import SideBarComponent from "../containers/SideBarComponent";
import BookmarkScreen from "./BookmarkScreen";
import TestScreen from "./TestScreen";
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";
import rssReducer from "../reducers/rss";

const store = createStore(rssReducer);

const styles = StyleSheet.create({
  // root: {
  //   ...ifIphoneX(
  //     {
  //       paddingTop: 40,
  //       height: 70
  //     },
  //     {
  //       paddingTop: getStatusBarHeight(),
  //       height: 50
  //     }
  //   )
  // },
  test: {
    // backgroundColor: "transparent"
    // backgroundColor: "rgba(52, 52, 52, 0.5)"
    backgroundColor: "#1e2226",
    borderBottomWidth: 0
  }
});

const scenes = Actions.create(
  <Scene key="root">
    <Drawer
      key="drawer"
      drawerWidth={300}
      drawerIcon={() => <Icon name="menu" style={{ color: "white" }} />}
      contentComponent={SideBarComponent}
      hideNavBar
    >
      <Scene
        key="TopScreen"
        initial
        component={TopScreen}
        navigationBarStyle={styles.test}
        titleStyle={{ color: "#FFF" }}
        title="ジョジョのニュース"
      />
      <Scene
        key="BookmarkScreen"
        component={BookmarkScreen}
        title="あとで読む"
        navigationBarStyle={styles.test}
        titleStyle={{ color: "#FFF" }}
      />
    </Drawer>
    <Scene
      key="ArticleScreen"
      component={ArticleScreen}
      title="ArticleScreen"
      hideNavBar
    />
  </Scene>
);

export default class App extends React.Component {
  render() {
    // closeDrawer = () => {
    //   this.drawer._root.close()
    // };
    // openDrawer = () => {
    //   this.drawer._root.open()
    // };

    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}
