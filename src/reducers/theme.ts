import { AnyAction } from 'redux';

export default function theme(state = 'darkblue', action: AnyAction) {
  if (action.type === 'CHANGE_THEME') {
    return action.payload;
  } else {
    return state;
  }
}
