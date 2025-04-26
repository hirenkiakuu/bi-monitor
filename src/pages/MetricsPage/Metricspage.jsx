import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../layouts/Dashboard";
import cls from "./Metricspage.module.scss";
import RateCard from "../../features/RateCard/RateCard";
import CrossRebateTable from "../../features/CrossRebateTable/CrossRebateTable";
import WeightsTable from "../../features/WeightsTable/WeightsTable";
import { Spin } from "antd";

const Metricspage = () => {
  const { uploaded } = useContext(FileContext);
  const [reportData, setReportData] = useState(null);
  const token = localStorage.getItem("mb-token");

  useEffect(() => {
    if (!uploaded) return;

    fetch("http://192.168.0.161:8000/api/report/plan")
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке отчёта:", err);
      });
  }, [uploaded]);

  if (!uploaded) return <h1>Нет данных</h1>;
  if (!reportData) return <Spin />;

  return (
    <div className={cls["metrics-page-container"]}>
      <div className={cls["rate-cards"]}>
        <RateCard
          title={"Выполнение общего плана"}
          value={reportData.completion_percentage}
          percents={true}
        />
        <RateCard title={"Средний балл"} />
        <RateCard
          title={"Отстающие от плана разделы"}
          value={reportData.behind_chapters}
          total={reportData.total_chapters}
          behind={reportData.behind_chapters}
        />
      </div>

      <iframe
        src={`http://192.168.0.161:3000/public/dashboard/${token}`}
        frameborder="0"
        width="100%"
        height="800"
        allowtransparency
      ></iframe>

      <div className={cls["info-tables"]}>
        {/* <CrossRebateTable data={[]} /> */}
        {/* <WeightsTable data={[]} /> */}
      </div>
    </div>
  );
};

export default Metricspage;
