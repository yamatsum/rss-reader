import {
  // Card,
  // CardItem,
  Container,
  // Content,
  // DeckSwiper,
  // Footer,
  // FooterTab,
  Tab,
  // TabHeading,
  Tabs,
  // Text,
  // Thumbnail,
  // ScrollableTab,
  View
} from "native-base";
import * as React from "react";
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";
// import HeaderComponent from "../components/HeaderComponent";
import ListComponent from "../components/ListComponent";
import { ScrollView } from "react-native";

export default class TopScreen extends React.Component {
  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <ListComponent />
        </View>
      </Container>
    );
  }
}
