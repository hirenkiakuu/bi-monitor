import cls from "./Header.module.scss";
import { Button } from "antd";

const Header = () => {
  return (
    <header className={cls["header"]}>
      <h1 className={cls["header-title"]}>Монитор плана продаж</h1>
      <div className={cls["tools-area"]}>
        <Button
          style={{
            width: "100%",
            backgroundColor: "#52c41a",
            borderColor: "#52c41a",
            color: "#fff",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.04)",
          }}
        >
          Экспорт в excel
        </Button>

        <Button
          style={{
            width: "100%",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.04)",
          }}
          // Показываем лоадер на кнопке
        >
          Экспорт в PDF
        </Button>
      </div>
    </header>
  );
};

export default Header;
