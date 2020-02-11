import { AnyAction } from 'redux';

export default function changeTheme(theme: string): AnyAction {
  return {
    type: 'CHANGE_THEME',
    payload: theme,
  };
}
