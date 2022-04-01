export const OPEN_MODAL = 'OPEN_MODAL'

export function openModal(state: boolean): SetModalType {
  return {
    type: OPEN_MODAL,
    payload: state,
  }
}

type SetModalType = {
  type: typeof OPEN_MODAL
  payload: boolean
}

export type SetModalAction = ReturnType<typeof openModal>
