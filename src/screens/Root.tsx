/* tslint:disable-next-line */
import * as React from "react";
import { StyleSheet } from "react-native";
import { Scene, Router, Actions, Drawer } from "react-native-router-flux";
import { Icon } from "native-base";

import TopScreen from "./TopScreen";
import ArticleScreen from "./ArticleScreen";
// import DrawerScreen from './DrawerScreen';
import SideBarComponent from "../components/SideBarComponent";
import BookmarkScreen from "./BookmarkScreen";
import TestScreen from "./TestScreen";
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";

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

const rssList = [
  {
    title: "ジョジョ速",
    url: "https://jojosoku.com/feed",
    registrationFlag: true
  },
  {
    title: "ジョジョss速報",
    url: "http://www.xn--ss-ci4aa8ub2251exr3e.com/index.rdf",
    registrationFlag: true
  }
];

const scenes = Actions.create(
  <Scene key="root">
    <Drawer
      key="drawer"
      drawerWidth={300}
      drawerIcon={() => <Icon name="menu" style={{ color: "white" }} />}
      contentComponent={SideBarComponent}
      hideNavBar
      feeds={rssList}
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

    return <Router scenes={scenes} />;
  }
}
