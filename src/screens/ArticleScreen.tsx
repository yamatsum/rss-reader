import * as React from "react";
import {
  WebView,
} from 'react-native';

class ArticleScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <WebView
        source={{uri: this.props.link}}
      />
    )
  }
};

export default ArticleScreen;
