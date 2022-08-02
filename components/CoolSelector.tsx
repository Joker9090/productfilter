import React from "react";

export type CoolSelectorItem = {
  label: String,
  value: String,
  isActive: Boolean,
  colorClass: String,
}

export const CoolSelector = ({ onlyOne = false, writing = true, items, onClick, className = "" }: { onlyOne: boolean, writing: boolean, items: CoolSelectorItem[], className: String | null, onClick: Function | null }) => {
  const [isHolderActive, setIsHolderActive] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeItems, setActiveItems] = React.useState<CoolSelectorItem[]>(items.filter(i => i.isActive));
  const clickFn = (item: CoolSelectorItem) => {
    item.isActive = !item.isActive;
    let newItems = [...activeItems];
    if (item.isActive) {
      newItems.push(item);
      setQuery("");
    } else newItems = newItems.filter((i) => (`${i.value}` !== `${item.value}`));
    if (onlyOne) setActiveItems((item.isActive) ? [item] : []);
    else setActiveItems([...newItems]);

    if (onClick) onClick(item);
    setIsHolderActive(false);
  }

  const removeItem = (item: CoolSelectorItem) => {
    if (!onlyOne) clickFn(item)
  }

  const filter4Query = (i: CoolSelectorItem) => {
    if (activeItems.map(ai => ai.value).indexOf(i.value) !== -1) return false;
    return (query === "" || i.label.toLowerCase().indexOf(query) !== -1);
  }

  React.useEffect(() => {
    setActiveItems(items.filter(i => i.isActive))
  }, [items])

  return (
    <div className={`CoolSelector ${className} ${isHolderActive ? 'CoolSelectorHolderActive' : ''}`}>
      <div className="CoolSelectorActiveItem">
        {activeItems.map((activeItem, index) => (<CoolItemBullet key={`CoolItem-${index}-${activeItem.value}`} item={activeItem} onClick={() => removeItem(activeItem)} />))}
        {writing ? (<input onClick={() => setIsHolderActive(!isHolderActive)} value={query} onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} type="text" />) : (
          <div onClick={() => setIsHolderActive(!isHolderActive)} className="CoolSelectorPointer">
            <span className="customIcon icon-play c-white" />
          </div>
        )}
      </div>
      <div className="CoolSelectorItemHolder">
        {items.filter(filter4Query).map((i, index) => <CoolItem key={`CoolItem-${index}-${i.value}-${i.isActive}`} item={i} onClick={() => clickFn(i)} />)}
      </div>
    </div>
  )
}

export const CoolItem = ({ item, onClick }: { item: CoolSelectorItem, onClick: Function }) => {
  return (
    <div className={`CoolSelectorItem ${item.colorClass}`} onClick={() => onClick()}>
      <p>{item.label}</p>
    </div>
  )
}

export const CoolItemBullet = ({ item, onClick }: { item: CoolSelectorItem, onClick: Function }) => {
  return (
    <div className={`CoolItemBullet ${item.colorClass}`} onClick={() => onClick()}>
      <p>{item.label}</p>
    </div>
  )
}