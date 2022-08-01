export const Price = ({ value }: { value: number }) => (
  <div className="Price">
    <span>$</span>
    <span>{Number(value / 100).toFixed(0)}</span>
    <span>.</span>
    <span>{Number(value % 100)}</span>
  </div>
);
