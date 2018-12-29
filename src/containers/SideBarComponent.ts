import { connect } from "react-redux";
import SideBarComponent from "../components/SideBarComponent";
import { changeRegistration } from "../actions/rssList";

function mapStateToProps({ rssList }) {
  return { rssList };
}

function mapDespatchToProps(dispatch) {
  return {
    changeRegistration(rss) {
      dispatch(changeRegistration(rss));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDespatchToProps
)(SideBarComponent);
