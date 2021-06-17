import { RequestDetailType } from '../request-query-types';

export interface RequestDialogData {
  request: RequestDetailType,
}

export interface NewRequestDialogProps {
  openDialog: boolean,
  handleCloseDialog: ()=> void,
  dialogTitle: string,
  dialogContentID: string
}
