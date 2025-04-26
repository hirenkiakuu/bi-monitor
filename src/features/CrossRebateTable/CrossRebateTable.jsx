import { Table } from "antd";
import cls from "./CrossRebateTable.module.scss";

// подключить к апишке
const columns = [
  {
    title: "Условие",
    dataIndex: "condition",
    key: "condition",
  },
  {
    title: "Эффект",
    dataIndex: "effect",
    key: "effect",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
  },
];

const dataSource = [
  {
    key: "1",
    condition: "Postgres Pro > 75%",
    effect: "+1% к Kaspersky",
    status: "Активно",
  },
  {
    key: "2",
    condition: "Postgres Pro > 75%",
    effect: "+1% к Kaspersky",
    status: "Активно",
  },
  {
    key: "3",
    condition: "Postgres Pro > 75%",
    effect: "+1% к Kaspersky",
    status: "Активно",
  },
];

const CrossRebateTable = ({ data }) => {
  return (
    <div className={cls["table-wrapper"]}>
      <h2>Правила кросс-рибейта</h2>
      <Table
        pagination={false}
        style={{ width: "500px", minWidth: "500px", maxWidth: "720px" }}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default CrossRebateTable;
