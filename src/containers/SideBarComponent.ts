import { connect } from "react-redux";
import SideBarComponent from "../components/SideBarComponent";
// import { changeRegistration } from "../actions/rssList";
import { changeIndex } from "../actions/rssIndex";

function mapStateToProps({ rssList, rssIndex }) {
  return { rssList, rssIndex };
}

// function mapDespatchToProps(dispatch) {
//   return {
//     changeRegistration(rss) {
//       dispatch(changeRegistration(rss));
//     }
//   };
// }
function mapDespatchToProps(dispatch) {
  return {
    onChangeIndex(index) {
      dispatch(changeIndex(index));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDespatchToProps
)(SideBarComponent);
