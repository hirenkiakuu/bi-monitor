import { useEffect, useState } from "react";
import cls from "./ExcelDataEditor.module.scss";
import CrossRebateTableEdit from "../../features/EditPageTables/CrossRebateTableEdit/CrossRebateTableEdit";
import WeightsTableEdit from "../../features/EditPageTables/WeightsTableEdit/WeightsTableEdit";
import IncomingsTable from "../../features/EditPageTables/IncomingsTable/IncomingsTable";
import ProductsTable from "../../features/EditPageTables/ProductsTable/ProductsTable";
import axios from "axios";
import { Spin } from "antd";

const ExcelDataEditor = () => {
  const [incomingsData, setIncomingsData] = useState([]);
  const [groupWeightsData, setGroupWeightsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchSales = axios.get("http://192.168.0.161:8000/api/report/sales");
    const fetchGroups = axios.get(
      "http://192.168.0.161:8000/api/report/groups"
    );
    const fetchProducts = axios.get(
      "http://192.168.0.161:8000/api/report/products"
    );

    Promise.all([fetchSales, fetchGroups, fetchProducts])
      .then(([salesRes, groupsRes, productsRes]) => {
        const formattedSales = salesRes.data.map((item, index) => ({
          key: index.toString(),
          date: new Date(item.payment_date).toLocaleDateString("ru-RU"),
          group: item.company,
          product: item.product_type,
          sum: `${item.amount.toLocaleString("ru-RU")}₽`,
        }));

        const formattedGroups = groupsRes.data.map((item) => ({
          key: item.id.toString(),
          group: item.name.trim(),
          weight: item.weight.toFixed(2),
          isNew: false,
        }));

        const formattedProducts = Object.entries(productsRes.data).map(
          ([product, group], index) => ({
            key: index.toString(),
            product,
            group,
            isNew: false,
          })
        );

        setIncomingsData(formattedSales);
        setGroupWeightsData(formattedGroups);
        setProductsData(formattedProducts);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spin />;

  return (
    <div className={cls["tables-edit-container"]}>
      <CrossRebateTableEdit />
      <WeightsTableEdit initialData={groupWeightsData} />
      <ProductsTable initialData={productsData} />
      <IncomingsTable data={incomingsData} />
    </div>
  );
};

export default ExcelDataEditor;
