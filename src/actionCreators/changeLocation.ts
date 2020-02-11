import { AnyAction } from 'redux';

export default function changeLocation(location: string): AnyAction {
  return {
    type: 'CHANGE_LOCATION',
    payload: location,
  };
}
