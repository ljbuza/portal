import React from "react";
import { Table } from "semantic-ui-react";

const DataTable = ({ data, headers }) => {
  const headerRow = headers || Object.keys(data[0]);
  const rows = data => {
    const cells = [];
    headerRow.map(header => {
      cells.push(data[header] || "");
      return undefined;
    });
    return { cells };
  };
  return (
    <Table
      className="ui striped compact"
      size="small"
      headerRow={headerRow}
      renderBodyRow={rows}
      tableData={data}
    />
  );
};
export default DataTable;
