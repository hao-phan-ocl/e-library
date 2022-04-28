import { openDialog } from '../../redux/dialog/actions'

export const OPEN_DIALOG = 'OPEN_DIALOG'

export type SetDialogType = {
  type: typeof OPEN_DIALOG
  payload: boolean
}

export type SetDialogAction = ReturnType<typeof openDialog>
