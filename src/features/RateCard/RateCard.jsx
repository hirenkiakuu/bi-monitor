import cls from "./RateCard.module.scss";
import { Card, Progress } from "antd";

const stylesConfig = {
  header: {
    borderBottom: "none",
    fontSize: "24px",
  },
  body: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
};

const RateCard = ({ title, value, percents, behind, total, points }) => {
  return (
    <Card
      title={title}
      style={{
        maxWidth: "508px",
        minWidth: "380px",
        flex: "1",
        borderRadius: "2px",
      }}
      styles={stylesConfig}
    >
      <h2>
        {" "}
        {value} {percents && "%"} {points && "баллов"}
      </h2>
      <Progress
        showInfo={Boolean(total)}
        percent={total ? (+behind / +total) * 100 : value}
        status="active"
      />
    </Card>
  );
};

export default RateCard;
