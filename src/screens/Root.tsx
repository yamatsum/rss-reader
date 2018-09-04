/* tslint:disable-next-line */
import * as React from "react";
import {
  Scene,
  Router,
  Actions,
  Drawer,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import TopScreen from "./TopScreen";
import ArticleScreen from "./ArticleScreen";
// import DrawerScreen from './DrawerScreen';
import SideBarComponent from '../components/SideBarComponent';

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Drawer
      key="drawer"
      drawerWidth={ 300 }
      drawerIcon={() => (<Icon name='menu' />)}
      contentComponent={SideBarComponent}
      hideNavBar
      >
      <Scene key="TopScreen" initial component={TopScreen} title="TopScreen"/>
    </Drawer>
    <Scene key="ArticleScreen" component={ArticleScreen} title="ArticleScreen" hideNavBar={false} />
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

    return <Router scenes={scenes}/>
  }
}
