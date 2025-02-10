"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const openFormBtn = document.querySelector(".open-form-btn");
  const overlay = document.getElementById("overlay");
  const closeForm = document.getElementById("closeForm");
  const fileInput = document.getElementById("fileInput");
  const fileLabel = document.getElementById("file-label");
  const submitButton = document.getElementById("submitButton");
  const form = document.getElementById("applicationForm");
  const requiredFields = form.querySelectorAll("[required]");

  const MAX_FILES = 3; // Максимальное количество файлов
  const MAX_SIZE_MB = 5; // Максимальный размер файла в MB
  const ALLOWED_FORMATS = ["pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"]; // Разрешенные форматы

  // Открытие формы
  openFormBtn.addEventListener("click", function () {
      overlay.style.display = "flex";
  });

  // Закрытие формы
  closeForm.addEventListener("click", function () {
      overlay.style.display = "none";
  });

  // Закрытие при клике вне формы
  overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
          overlay.style.display = "none";
      }
  });

  // Открытие файлового диалога при клике на область загрузки
  fileLabel.addEventListener("click", function () {
      fileInput.click();
  });

  // Проверка состояния всех обязательных полей
  function checkFormValidity() {
      let isFormValid = true;

      // Проверяем, что все обязательные поля заполнены
      requiredFields.forEach(function(field) {
          if (!field.value.trim()) {
              isFormValid = false;
          }
      });

      // Проверка, активировать ли кнопку отправки
      if (isFormValid) {
          submitButton.disabled = false;
          submitButton.style.backgroundColor = "#B21F24"; // Активный цвет
         
      } else {
          submitButton.disabled = true;
          submitButton.style.backgroundColor = "#CFCFCF"; // Неактивный цвет
      }
  }

  // Слушаем все обязательные поля
  requiredFields.forEach(function(field) {
      field.addEventListener("input", checkFormValidity);
  });

  fileInput.addEventListener("change", function () {
      let files = fileInput.files;
      let fileCount = files.length;
      let errorMessage = "";

      // Проверка количества файлов
      if (fileCount > MAX_FILES) {
          errorMessage = `Можно загрузить не более ${MAX_FILES} файлов!`;
      }

      for (let i = 0; i < fileCount; i++) {
          let file = files[i];
          let fileSizeMB = file.size / (1024 * 1024);
          let fileExt = file.name.split('.').pop().toLowerCase();

          // Проверка размера файла
          if (fileSizeMB > MAX_SIZE_MB) {
              errorMessage = `Файл "${file.name}" превышает ${MAX_SIZE_MB}MB!`;
              break;
          }

          // Проверка формата файла
          if (!ALLOWED_FORMATS.includes(fileExt)) {
              errorMessage = `Файл "${file.name}" имеет недопустимый формат!`;
              break;
          }
      }

      // Обработка ошибок и успешной загрузки
      if (errorMessage) {
          fileLabel.querySelector("span").textContent = errorMessage; // Меняем только текст в <span>
          fileLabel.style.color = "#B22222"; // Цвет ошибки
          fileInput.value = ""; // Очистить input
      } else if (fileCount > 0) {
          fileLabel.querySelector("span").innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 7.42857V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V4C5 2.89543 5.89543 2 7 2H13.5806M19 7.42857L13.5806 2M19 7.42857H15.5806C14.4761 7.42857 13.5806 6.53314 13.5806 5.42857V2" stroke="#614D49"/>
</svg>
Загружено ${fileCount} ${fileCount === 1 ? "Файл" : "Файла"}`; // Добавление иконки перед текстом
          fileLabel.style.color = "#614D49"; // Стандартный цвет
      } else {
          fileLabel.querySelector("span").textContent = "Приложить Файлы (До Трех Файлов)"; // Меняем только текст в <span>
          fileLabel.style.color = "#000"; // Стандартный цвет
      }

      // После изменения состояния файлов проверим валидность формы
      checkFormValidity();
  });

  // Проверим форму при загрузке страницы
  checkFormValidity();
});