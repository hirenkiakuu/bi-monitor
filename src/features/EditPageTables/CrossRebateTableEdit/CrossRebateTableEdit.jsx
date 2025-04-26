import { Table, Button, Input, Switch, Select } from "antd";
import { useState } from "react";
import cls from "./CrossRebateTableEdit.module.scss";

let uniqueId = 0;

const conditions = [">", "<"];

const mockData = [
  {
    key: "1",
    condition: {
      group: "ФОКУС",
      operator: ">",
      percent: "50%",
    },
    effect: {
      percent: "2",
      group: "Основной",
    },
    status: true,
    isNew: false,
  },
  {
    key: "2",
    condition: {
      group: "Основной",
      operator: "<",
      percent: "80%",
    },
    effect: {
      percent: "1.5",
      group: "Дополнительный",
    },
    status: false,
    isNew: false,
  },
  {
    key: "3",
    condition: {
      group: "Дополнительный",
      operator: ">",
      percent: "30%",
    },
    effect: {
      percent: "3",
      group: "ФОКУС",
    },
    status: true,
    isNew: false,
  },
];

const CrossRebateTableEdit = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      condition: {
        group: "Postgres Pro",
        operator: ">",
        percent: "75%",
      },
      effect: {
        percent: "1",
        group: "Kaspersky",
      },
      status: true,
      isNew: false,
    },
    ...mockData,
  ]);

  const groups = ["ФОКУС", "Основной", "Дополнительный"];

  const handleAddRow = () => {
    const newRow = {
      key: `new-${uniqueId++}`,
      condition: {
        group: "",
        operator: "",
        percent: "",
      },
      effect: {
        percent: "",
        group: "",
      },
      status: true,
      isNew: true,
    };
    setDataSource([...dataSource, newRow]);
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
  };

  const handleInputChange = (key, path, value) => {
    setDataSource((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;
        const [field, subfield] = path.split(".");
        return {
          ...item,
          [field]: {
            ...item[field],
            [subfield]: value,
          },
        };
      })
    );
  };

  const handleStatusChange = (key, value) => {
    setDataSource((prev) =>
      prev.map((item) => (item.key === key ? { ...item, status: value } : item))
    );
  };

  const handleSave = () => {
    const updated = dataSource.map((item) => ({
      ...item,
      isNew: false,
    }));
    setDataSource(updated);
    console.log("Saving:", updated);
  };

  const columns = [
    {
      title: "Условие",
      dataIndex: "condition",
      key: "condition",
      render: (_, record) =>
        record.isNew ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <Select
              placeholder="Группа"
              value={record.condition.group || undefined}
              onChange={(value) =>
                handleInputChange(record.key, "condition.group", value)
              }
              style={{ width: 120 }}
            >
              {groups.map((group) => (
                <Select.Option key={group} value={group}>
                  {group}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Оператор"
              value={record.condition.operator || undefined}
              onChange={(value) =>
                handleInputChange(record.key, "condition.operator", value)
              }
              style={{ width: 80 }}
            >
              {conditions.map((cond) => (
                <Select.Option key={cond} value={cond}>
                  {cond}
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder="%"
              value={record.condition.percent}
              onChange={(e) =>
                handleInputChange(
                  record.key,
                  "condition.percent",
                  e.target.value
                )
              }
              style={{ width: 80 }}
            />
          </div>
        ) : (
          `${record.condition.group} ${record.condition.operator} ${record.condition.percent}`
        ),
    },
    {
      title: "Эффект",
      dataIndex: "effect",
      key: "effect",
      render: (_, record) =>
        record.isNew ? (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Input
              placeholder="%"
              value={record.effect.percent}
              onChange={(e) =>
                handleInputChange(record.key, "effect.percent", e.target.value)
              }
              style={{ width: 80 }}
            />
            <span>к</span>
            <Select
              placeholder="Группа"
              value={record.effect.group || undefined}
              onChange={(value) =>
                handleInputChange(record.key, "effect.group", value)
              }
              style={{ width: 120 }}
            >
              {groups.map((group) => (
                <Select.Option key={group} value={group}>
                  {group}
                </Select.Option>
              ))}
            </Select>
          </div>
        ) : (
          `+${record.effect.percent} % к ${record.effect.group}`
        ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status}
          onChange={(val) => handleStatusChange(record.key, val)}
          checkedChildren="Активно"
          unCheckedChildren="Неактивно"
        />
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Button type="text" danger onClick={() => handleDelete(record.key)}>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div className={cls["table-wrapper"]}>
      <div className={cls["block-header"]}>
        <h2>Правила кросс-рибейта</h2>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <Button
        type="primary"
        style={{
          marginTop: 16,
          width: "175px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={handleAddRow}
      >
        + Добавить ряд
      </Button>
    </div>
  );
};

export default CrossRebateTableEdit;
