import { connect } from "react-redux";
import FeedScreen from "../screens/FeedScreen";
import { changeIndex } from "../actions/rssIndex";

function mapStateToProps({ rssList, rssIndex }) {
  return { rssList, rssIndex };
}

function mapDespatchToProps(dispatch) {
  return {
    onChangeIndex(index) {
      dispatch(changeIndex(index));
    }
  };
}

export default connect(mapStateToProps)(FeedScreen);
