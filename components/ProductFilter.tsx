import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FilterObject } from "../redux/reducers/main"
import { CoolSelector, CoolSelectorItem } from './CoolSelector';
import { buildCategoryTypeString, serverTypeEnum } from '../models/Product';

export const ProductFilter = ({ filterObject, filterProducts }: { filterObject: FilterObject, filterProducts: Function }) => {
  const [categoryItems, setCategoryItems] = React.useState<CoolSelectorItem[]>([]);
  const [serverItems] = React.useState<CoolSelectorItem[]>([0, 1].map((i) => ({ value: i.toString(), label: serverTypeEnum[i], isActive: false, colorClass: "" })));

  const selectCategory = (category: CoolSelectorItem) => {
    let categoriesSelected = filterObject.categories.split(",");
    if (categoriesSelected.indexOf(category.value.toString()) === -1) categoriesSelected.push(category.value.toString())
    else categoriesSelected = categoriesSelected.filter(i => i !== category.value.toString());
    filterObject.categories = categoriesSelected.join(",");
    filterProducts({ ...filterObject, category: category });
  };

  const selectServerType = (server: CoolSelectorItem) => {
    let serverSelected = (filterObject.serverTypes.length) ? filterObject.serverTypes.split(",") : [];
    if (server.isActive) {
      if (serverSelected.indexOf(server.value.toString()) === -1) serverSelected.push(server.value.toString())
    } else {
      serverSelected = serverSelected.filter(i => i !== server.value.toString());
    }
    filterObject.serverTypes = (serverSelected.length) ? serverSelected.join(",") : '';
    filterProducts({ ...filterObject });
  }

  React.useEffect(() => {
    setCategoryItems(filterObject.categoriesOptions.split(",").map((v) => ({ value: v, label: buildCategoryTypeString(Number(v)), isActive: false, colorClass: "" })))
  }, [filterObject]);

  return (
    <div className="ProductFilter">
      <Container fluid={false} >
        <Row>
          <Col>
            <label>id, title, description</label>
            <input className="w-100" type="text" onChange={(event) => filterProducts({ ...filterObject, query: event.target.value })} />
          </Col>
          <Col>
            <label>category, subCategories</label>
            <CoolSelector className={""} writing={true} items={categoryItems} onClick={selectCategory} />
          </Col>
          <Col className="flex-column">
            <label className="pushed">server type</label>
            <CoolSelector className="pushed" writing={false} items={serverItems} onClick={selectServerType} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}