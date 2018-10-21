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
  root: {
    ...ifIphoneX(
      {
        paddingTop: 40,
        height: 70
      },
      {
        paddingTop: getStatusBarHeight(),
        height: 50
      }
    )
    // backgroundColor: "transparent"
    // backgroundColor: "rgba(52, 52, 52, 0.5)"
  }
});

const scenes = Actions.create(
  <Scene key="root" navigationBarStyle={styles.root}>
    <Drawer
      key="drawer"
      drawerWidth={300}
      drawerIcon={() => <Icon name="menu" />}
      contentComponent={SideBarComponent}
      hideNavBar
    >
      <Scene
        key="TopScreen"
        initial
        component={TopScreen}
        title="ジョジョのニュース"
      />
    </Drawer>
    <Scene
      key="ArticleScreen"
      component={ArticleScreen}
      title="ArticleScreen"
      hideNavBar
    />
    <Scene key="BookmarkScreen" component={BookmarkScreen} title="bookmarks" />
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
