import axios from "axios";
import { BASE_URL } from "../consts/api";

// Функция для отправки файла на сервер
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Отправляем файл на сервер
    const response = await axios.post(`${BASE_URL}/report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      localStorage.setItem("mb-token", response.data.dashboard_id);
      return { success: true };
    } else {
      return { success: false, message: "Ошибка при загрузке файла!" };
    }
  } catch (error) {
    return { success: false, message: "Ошибка при загрузке файла!" };
  }
};
