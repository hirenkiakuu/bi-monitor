import cls from "./Sidebar.module.scss";
import { Select } from "antd";
import ExcelUpload from "../../features/ExcelUpload/ExcelUpload";

// получить с сервера
// при изменении выбранного фильтра слать запрос на бэк
// добавить кнопку импорта эксельки
const quarterSelectOptions = [];
const groupSelectOptions = [];
const vendorsSelectOptions = [];

const regionSelectOptions = [
  { value: "sverdlovsk", label: "Свердловская область" },
  { value: "sverdlovsk", label: "Свердловская область" },
  { value: "sverdlovsk", label: "Свердловская область" },
];

const Sidebar = () => {
  return (
    <div className={cls["sidebar"]}>
      <div className={cls["tools-area"]}>
        <div className={cls["select"]}>
          <label htmlFor="">Продуктовая группа</label>
          <Select
            options={regionSelectOptions}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите продуктовую группу"
          />
        </div>
        <div className={cls["select"]}>
          <label htmlFor="">Продукты (Производитель)</label>
          <Select
            options={regionSelectOptions}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите производителя"
          />
        </div>
        <div className={cls["select"]}>
          <label htmlFor="">Регион</label>
          <Select
            options={regionSelectOptions}
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите регион"
          />
        </div>

        <div className={cls["file-upload"]}>
          <ExcelUpload />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
