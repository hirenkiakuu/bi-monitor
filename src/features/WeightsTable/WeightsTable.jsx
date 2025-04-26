import { Table } from "antd";
import cls from "./WeightsTable.module.scss";

// подключить к апишке
const columns = [
  {
    title: "Группа",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Вес",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Изменение",
    dataIndex: "change",
    key: "change",
  },
];

const dataSource = [
  {
    key: "1",
    group: "Фокус",
    weight: 0.8,
    change: "+0.2",
  },
  {
    key: "1",
    group: "Фокус",
    weight: 0.8,
    change: "+0.2",
  },
  {
    key: "1",
    group: "Фокус",
    weight: 0.8,
    change: "+0.2",
  },
];

const WeightsTable = ({ data }) => {
  return (
    <div className={cls["table-wrapper"]}>
      <h2>Распределение веса по группам</h2>
      <Table
        pagination={false}
        style={{ width: "500px", minWidth: "500px", maxWidth: "720px" }}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default WeightsTable;
