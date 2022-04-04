export const OPEN_DIALOG = 'OPEN_DIALOG'

export function openDialog(state: boolean): SetDialogType {
  return {
    type: OPEN_DIALOG,
    payload: state,
  }
}

type SetDialogType = {
  type: typeof OPEN_DIALOG
  payload: boolean
}

export type SetDialogAction = ReturnType<typeof openDialog>
