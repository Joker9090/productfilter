import { buildCategoryTypeString, productTypeEnum } from "../models/Product";

export const Bullet = ({ value, onClick }: { value: productTypeEnum,  onClick: Function | null }) => (
  <div className={`Bullet BulletCategory${value}`} onClick={(onClick) ? onClick(value) : () => {}}>
    <p>{buildCategoryTypeString(value)}</p>
  </div>
);
