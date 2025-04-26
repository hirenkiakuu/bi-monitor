import { Table, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import cls from "./WeightsTableEdit.module.scss";

let uniqueId = 0;

const WeightsTableEdit = ({ initialData }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (initialData.length > 0) {
      setDataSource(initialData);
    }
  }, [initialData]);

  const uniqueGroups = Array.from(
    new Set(initialData.map((item) => item.group))
  ).filter(Boolean);

  const handleAddRow = () => {
    const newRow = {
      key: `new-${uniqueId++}`,
      group: "",
      weight: "",
      isNew: true,
    };
    setDataSource([...dataSource, newRow]);
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleInputChange = (key, field, value) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    const newRows = dataSource.filter((item) => item.isNew);
    console.log("Saving rows:", newRows);
    const updated = dataSource.map((item) =>
      item.isNew ? { ...item, isNew: false } : item
    );
    setDataSource(updated);
  };

  const columns = [
    {
      title: "Группа",
      dataIndex: "group",
      key: "group",
      render: (_, record) =>
        record.isNew ? (
          <Select
            placeholder="Группа"
            value={record.group || undefined}
            onChange={(value) => handleInputChange(record.key, "group", value)}
            style={{ width: "100%" }}
          >
            {uniqueGroups.map((group) => (
              <Select.Option key={group} value={group}>
                {group}
              </Select.Option>
            ))}
          </Select>
        ) : (
          record.group
        ),
    },
    {
      title: "Вес",
      dataIndex: "weight",
      key: "weight",
      render: (_, record) =>
        record.isNew ? (
          <Input
            value={record.weight}
            placeholder="Значение (от 0 до 1)"
            onChange={(e) =>
              handleInputChange(record.key, "weight", e.target.value)
            }
          />
        ) : (
          record.weight
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
        <h2>Распределение веса по группам</h2>
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

export default WeightsTableEdit;
