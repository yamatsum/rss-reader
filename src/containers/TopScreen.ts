import { connect } from "react-redux";
import TopScreen from "../screens/TopScreen";

function mapStateToProps({ rssList }) {
  return { rssList };
}

export default connect(mapStateToProps)(TopScreen);
