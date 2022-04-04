import { OPEN_DIALOG, SetDialogAction } from './actions'

type InitialState = {
  state: boolean
}

const initialState = {
  state: false,
}

export default function dialogReducer(
  state = initialState,
  action: SetDialogAction
): InitialState {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        state: action.payload,
      }

    default:
      return state
  }
}
