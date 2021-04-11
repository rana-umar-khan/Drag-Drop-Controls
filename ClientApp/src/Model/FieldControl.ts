export interface FieldControl {
  id: number;
  height: number;
  width: number;
  top: number;
  left: number;
}

export enum ControlsMapping {
  Text = 1,
  Number = 2,
  TextArea = 3
}
