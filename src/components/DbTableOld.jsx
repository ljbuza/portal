import _ from "lodash";
import React, { Component } from "react";
import {
  Checkbox,
  Table,
  Form,
  Menu,
  Icon,
  Popup,
  Label
} from "semantic-ui-react";
import { observer, action } from "mobx-react";
import { withRouter } from "react-router";
import tableData2 from "../data/databrowserTreeData.json";

@observer class DbTable extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleColumnChoice = this.handleColumnChoice.bind(this);
  //   this.handleSort = this.handleSort.bind(this);
  // }
  // setSection = () => {
  //   this.props.store.section = this.props.section;
  // };

  handleColumnChoice = evt => {
    //   const { columns, usedColumns } = this.props.store;
    //   const columnChosen = evt.target.innerHTML;
    //   if (usedColumns.indexOf(columnChosen) !== -1) {
    //     // this.setState({
    //     //   usedColumns: usedColumns.filter(e => e !== columnChosen)
    //     // });
    //   } else {
    //     const chosenIndex = columns.indexOf(columnChosen);
    //     usedColumns.splice(chosenIndex, 0, columnChosen);
    //     //   this.setState({
    //     //     usedColumns: usedColumns
    //     //   });
    //   }
  };

  handleSort = clickedColumn => () => {
    let data = this.props.store.filteredData;
    if (this.props.store.sortColumn !== clickedColumn) {
      // this.sortColumn = clickedColumn;
      const direction = "ascending";
      // this.data = _.sortBy(this.data, [clickedColumn], ["asc"]);
      return _.sortBy(data, (section) => section[clickedColumn]);
    } else {
      // return this.props.store.filteredData.reverse();
      this.direction = this.direction === "ascending"
        ? "decending"
        : "ascending";
    }

    // this.props.store.sort(clickedColumn.cellname);
    // const { data, sortColumn, direction } = this.props.store;
    // if (sortColumn !== clickedColumn.cellname) {
    // this.setState({
    //   sortColumn: clickedColumn.cellname,
    //   data: _.sortBy(data, [clickedColumn.cellname]),
    //   direction: "ascending"
    // });
    // return;
    // }
    // this.setState({
    //   data: data.reverse(),
    //   direction: direction === "ascending" ? "decending" : "ascending"
    // });
  };

  // filter() {
  //   this.props.store.view = this.props.view;
  // }

  // filterData = (data, usedColumns, filters) => {
    // let filteredData = [...data];
    // let pulls = [];
    // filteredData.map((row, index) => {
    //   filteredData[index] = _.pick(row, usedColumns);
    //   return undefined;
    // });
    // usedColumns.forEach(usedCol => {
    //   const colname = usedCol.replace(" ", "-");
    //   if (filters[`${this.props.store.view}-${colname}`]) {
    //     let colfilters = filters[`${this.props.store.view}-${colname}`];
    //     if (colfilters.length > 0) {
    //       filteredData.forEach(row => {
    //         if (
    //           !colfilters.includes(row[colname.replace("-", " ")].toLowerCase())
    //         ) {
    //           if (filteredData.indexOf(row) > -1) {
    //             pulls.push(filteredData.indexOf(row));
    //           }
    //         }
    //       });
    //     }
    //   }
    // });
    // _.pullAt(filteredData, pulls);
    // return filteredData;
    // return data;
  // };

  render() {
    const {
      data,
      sortColumn,
      columns,
      usedColumns,
      direction,
      filteredData
    } = this.props.store;

    // this.props.store.filterData();
    // const rowNames = Object.keys(data[0]);
    //   data,
    //   usedColumns,
    //   this.props.store.filters
    // );
    // const view = 'mac domains';
    const view = 'fiber nodes';

    const findLevel = (data, view, level) => {
      let newData = []; 
      if (level === view) {
        return data;
      }
      // if (data.hasOwnProperty(view)) {
      //   return data[view];
      // }

      if (Array.isArray(data)) {
        data.forEach((obj, i) => {
          for (let key in obj) {
            if (Array.isArray(obj[key]) && typeof obj[key][0] === 'object') {
              level = key;
              obj[key].forEach((v, i) => {
                newData.push(v);
              })
            }
          }
        })
      } else {
        for (let key in data) {
          if (Array.isArray(data[key]) && typeof data[key][0] === 'object') {
            level = key;
            data[key].forEach((obj, i) => {
              newData.push(obj);
            })
          }
        }
      }

        // if (typeof data[key] === 'object') {
        //   for (let inner in data[key]) {
        //     if (typeof data[key][inner] === 'object') {
        //       if (!newData.hasOwnProperty(inner)) {
        //         newData[inner] = null;
        //       }
        //       newData[inner] = data[key][inner];
        //     }
        //   }
        // }
      return findLevel(newData, view, level);
    }


    const td = this.props.store.td;

    const newdata = findLevel(td, view);
    console.log('new:', newdata);


    const hw_items = Object.keys(td);
    const td_headers = [];
    const rows = [];
    hw_items.forEach((item) => {
      let row = [];
      console.log('md', td[item]["mac domains"]);
      Object.keys(td[item]).forEach((col) => {
        if (typeof td[item][col] === "string") {
          row.push(td[item][col]);
        }
        if (!td_headers.includes(col) && typeof td[item][col] === "string") {
          td_headers.push(col);
        }
      });
      rows.push(row);
    });
    console.log('headers:', td_headers.join(', '));
    console.log('rows:', rows);

    const headers = Object.keys(filteredData[this.props.view][0]);

    if (1 != 1) {
      return <div>is loading...</div>;
    } else {
      return (
        <div>
          <Table striped selectable sortable size="small" compact>
            <Table.Header>
              <Table.Row>
                {headers.map((cellname, i) => 
                  <Table.HeaderCell 
                    key={i}
                    sorted={sortColumn === { cellname } ? direction : null}
                    onClick={this.handleSort(cellname)}
                  >
                    {cellname}
                        {i + 1 ===
                          headers.length
                          ? <Label attached="top right">
                              <ColumnSelect
                                rowNames={headers}
                                usedColumns={headers}
                                handleColumnChoice={this.handleColumnChoice}
                              />
                            </Label>
                          : ""}

                  </Table.HeaderCell>
                )}
                {/*{filteredData[this.props.view]
                  ? Object.keys(
                      filteredData[this.props.view][0]
                    ).map((cellname, index) => (
                      <Table.HeaderCell
                        key={index}
                        sorted={sortColumn === { cellname } ? direction : null}
                        onClick={this.props.store.sort(cellname)}
                      >
                        {cellname}
                        {index + 1 ===
                          Object.keys(filteredData[this.props.view][0]).length
                          ? <Label attached="top right">
                              <ColumnSelect
                                rowNames={["foo-columns", "bar"]}
                                usedColumns={["foo-usedColumn", "bar"]}
                                handleColumnChoice={this.handleColumnChoice}
                              />
                            </Label>
                          : ""}
                      </Table.HeaderCell>
                    ))
                  : ""}*/}
              </Table.Row>
            </Table.Header>
            <Table.Body>

              {/*<Table.Cell>
              <Input
                style={{ width: "60px" }}
                size="mini"
                placeholder="filter..."
              />
            </Table.Cell>*/}
              {filteredData[this.props.view].map((rows, index) => (
                <Table.Row key={index}>
                  {Object.values(rows).map((cell, index) => (
                    <Table.Cell key={index}>{cell}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="10">
                  {/*<Pagination
              items={filteredData}
              onChangePage={this.handlePageChange}
            />*/}
                  <Menu size="mini" floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="left chevron" />
                    </Menu.Item>
                    {[...Array(filteredData[this.props.view].length)].map(
                      (x, i) =>
                        i > 0 && i % 2 === 0
                          ? <Menu.Item key={i}>{i}</Menu.Item>
                          : ""
                    )}
                    <Menu.Item as="a" icon>
                      <Icon name="right chevron" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      );
    }
  }
}
export default withRouter(DbTable);

const ColumnSelect = props => {
  return (
    <Popup trigger={<Icon name="setting" />} position="bottom right" on="click">
      <Form>
        {props.rowNames.map((name, index) => (
          <Form.Field>
            <Checkbox
              slider
              key={index}
              defaultChecked={
                props.usedColumns.indexOf(name) > -1 ? true : false
              }
              label={name}
              onChange={props.handleColumnChoice}
            />
          </Form.Field>
        ))}
      </Form>
    </Popup>
  );
};
