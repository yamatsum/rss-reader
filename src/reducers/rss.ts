const initialState = {
  rssList: [
    {
      title: "ジョジョ速",
      url: "https://jojosoku.com/feed",
      registrationFlag: true
    },
    {
      title: "ジョジョss速報",
      url: "http://www.xn--ss-ci4aa8ub2251exr3e.com/index.rdf",
      registrationFlag: true
    }
  ],
  rssIndex: 0
};

export default function rssReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_REGISTRATION":
      return Object.assign({}, state, {
        rssList: [
          ...state.rssList.slice(0, action.index),
          Object.assign({}, state.rssList[action.index], {
            registrationFlag: !state.rssList[action.index].registrationFlag
          }),
          ...state.rssList.slice(action.index + 1)
        ]
      });
    case "CHANGE_INDEX":
      return Object.assign({}, state, {
        rssIndex: action.index
      });
    default:
      return state;
  }
}
