import { useState } from "react";
import cls from "./ExcelUpload.module.scss";
import { Upload, Button } from "antd";
import { uploadFile } from "../../lib/api/uploadFile";

import { useContext } from "react";
import { FileContext } from "../../layouts/Dashboard";

const ExcelUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const { setUploaded } = useContext(FileContext);

  // Функция для обработки загрузки
  const handleBeforeUpload = async (file) => {
    setUploading(true); // Показываем кнопку в состоянии загрузки

    console.log(file.name); // Логируем имя файла

    // Вызываем функцию отправки файла
    const result = await uploadFile(file);

    if (result.success) {
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false); // Через 2 секунды восстанавливаем состояние
        setUploaded(true);
      }, 2000);
    } else {
      console.log("error!");
      setUploadError(true);
      setTimeout(() => {
        setUploadError(false); // Через 2 секунды восстанавливаем состояние
      }, 2000);
    }

    setUploading(false); // Снимаем состояние загрузки

    // Останавливаем стандартное поведение загрузки
    return false;
  };

  return (
    <div className={cls["upload-wrapper"]}>
      <Upload
        style={{ width: "100%" }}
        beforeUpload={handleBeforeUpload} // Устанавливаем функцию загрузки
        showUploadList={false}
      >
        {/* // вынести стили в отдельную функцию и объект */}
        <Button
          style={{
            width: "100%",
            backgroundColor: uploadSuccess
              ? "#52c41a"
              : uploadError
                ? "#ff4d4f"
                : "#1890ff",
            borderColor: uploadSuccess
              ? "#389e0d"
              : uploadError
                ? "#d9363e"
                : "#1890ff",
            color: "#fff",
            boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.04)",
          }}
          loading={uploading} // Показываем лоадер на кнопке
        >
          {uploading
            ? "Загружается..."
            : uploadSuccess
              ? "Файл успешно загружен" // Текст после успешной загрузки
              : uploadError
                ? "Ошибка загрузки файла"
                : "Импортировать .xlsx файл"}{" "}
        </Button>
      </Upload>
    </div>
  );
};

export default ExcelUpload;
