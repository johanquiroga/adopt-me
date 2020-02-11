import { AnyAction } from 'redux';

export default function location(state = 'Seattle, WA', action: AnyAction) {
  if (action.type === 'CHANGE_LOCATION') {
    return action.payload;
  } else {
    return state;
  }
}
