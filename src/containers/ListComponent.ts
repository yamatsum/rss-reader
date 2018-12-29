import { connect } from "react-redux";
import ListComponent from "../components/ListComponent.tsx";

function mapStateToProps({ rssList }) {
  return { rssList };
}

export default connect(mapStateToProps)(ListComponent);
