import { OPEN_DIALOG, SetDialogType } from '../../types/redux/dialog'

export function openDialog(state: boolean): SetDialogType {
  return {
    type: OPEN_DIALOG,
    payload: state,
  }
}
