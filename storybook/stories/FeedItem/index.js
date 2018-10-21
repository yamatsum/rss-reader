import React from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {RkButton} from 'react-native-ui-kitten';
import {
  RkText,
  RkCard,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export default class FeedItem extends React.Component {
  showApp(event) {
    event.preventDefault();
    this.props.showApp();
  }

  render() {
    return (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => {}}>
      <RkCard rkType='horizontal' style={styles.card}>
        <Image rkCardImg source={''} />
        <View rkCardContent>
          <RkText numberOfLines={1} rkType='header6'>hoge</RkText>
          <RkText rkType='secondary6 hintColor'>
          </RkText>
          <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>hoge</RkText>
        </View>
        <View rkCardFooter>
        </View >
      </RkCard>
    </TouchableOpacity>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13,
  },
}));
