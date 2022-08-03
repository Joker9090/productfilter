const Menu = ({ createNew }: { createNew: Function }) => {
  return (
    <div className="Menu">
      <MenuBtn inside="+" onClick={createNew} />
    </div>
  )
}

const MenuBtn = ({ inside, onClick }: { inside: string, onClick: Function }) => {
  return (
    <div className="MenuBtn" data-cy="cy-create-registry" onClick={() => onClick()}>
      <span>{inside}</span>
    </div>
  )
}


export default Menu;