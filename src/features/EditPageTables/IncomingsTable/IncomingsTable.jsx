import { Table } from "antd";
import cls from "./IncomingsTable.module.scss";

const columns = [
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Группа",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Продукт",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    key: "sum",
  },
];

const IncomingsTable = ({ data }) => {
  return (
    <div className={cls["table-wrapper"]}>
      <h2>Поступления</h2>
      <Table pagination={false} dataSource={data} columns={columns} />
    </div>
  );
};

export default IncomingsTable;
