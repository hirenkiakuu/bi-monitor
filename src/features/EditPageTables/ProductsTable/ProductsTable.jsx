import { Table, Button, Input, Select } from "antd";
import { useState, useEffect } from "react";
import cls from "./ProductsTable.module.scss";

let uniqueId = 0;

const ProductsTable = ({ initialData = [] }) => {
  const groups = [
    "Фокус",
    "Сетевая безопасность",
    "Системное ПО",
    "Удаленное управление и виртуализация",
    "ВКС",
    "-",
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(initialData);
  }, [initialData]);

  const handleAddRow = () => {
    const newRow = {
      key: `new-${uniqueId++}`,
      product: "",
      group: "",
      isNew: true,
    };
    setDataSource((prev) => [...prev, newRow]);
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
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
      title: "Продукт",
      dataIndex: "product",
      key: "product",
      render: (_, record) =>
        record.isNew ? (
          <Input
            value={record.product}
            placeholder="Введите название"
            onChange={(e) =>
              handleInputChange(record.key, "product", e.target.value)
            }
          />
        ) : (
          record.product
        ),
    },
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
            {groups.map((group) => (
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
        <h2>Список всех продуктов</h2>
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

export default ProductsTable;
