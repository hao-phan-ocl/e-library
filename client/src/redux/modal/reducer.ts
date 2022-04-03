import { OPEN_MODAL, SetModalAction } from './actions'

type InitialState = {
  state: boolean
}

const initialState = {
  state: false,
}

export default function modalReducer(
  state = initialState,
  action: SetModalAction
): InitialState {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        state: action.payload,
      }

    default:
      return state
  }
}
