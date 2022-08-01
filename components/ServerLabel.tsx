import { buildServerTypeString, serverTypeEnum } from "../models/Product";

export const ServerLabel = ({ value, onClick }: { value: serverTypeEnum,  onClick: Function | null }) => (
  <div className={`ServerLabel ServerLabelCategory${value}`} onClick={(onClick) ? onClick(value) : () => {}}>
    <p>{buildServerTypeString(value)}</p>
  </div>
);
