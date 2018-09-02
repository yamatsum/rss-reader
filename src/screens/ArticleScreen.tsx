import * as React from "react";
import {
  WebView,
} from 'react-native';

class ArticleScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <WebView
        source={{uri: this.props.link}}
        style={{marginTop: 20}}
      />
    )
  }
};

export default ArticleScreen;
