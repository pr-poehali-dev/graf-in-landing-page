// Скрипт для генерации Zero Block кода для Tilda
// Инструкция: откройте ваш сайт в браузере, нажмите F12, вставьте этот код в консоль

(function() {
  console.log('%c🚀 Генератор Zero Block для Tilda', 'font-size: 20px; color: #00ff00; font-weight: bold;');
  console.log('%cИнструкция:', 'font-size: 14px; color: #ffff00;');
  console.log('1. Откройте ваш сайт Graf-in на poehali.dev');
  console.log('2. Нажмите F12 для открытия консоли');
  console.log('3. Вставьте этот код и нажмите Enter');
  console.log('4. Код для Tilda будет скопирован в буфер обмена');
  console.log('');

  // Функция для извлечения CSS стилей
  function extractStyles() {
    const styles = [];
    const sheets = document.styleSheets;
    
    for (let sheet of sheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (let rule of rules) {
          if (rule.cssText) {
            styles.push(rule.cssText);
          }
        }
      } catch (e) {
        console.log('Не удалось прочитать стили из:', sheet.href);
      }
    }
    
    return styles.join('\n');
  }

  // Функция для очистки HTML от React атрибутов
  function cleanHTML(html) {
    return html
      .replace(/\sdata-reactroot=""/g, '')
      .replace(/\sdata-react[^=]*="[^"]*"/g, '')
      .replace(/<!--.*?-->/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Генерация Zero Block кода
  function generateZeroBlock(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`Секция ${sectionId} не найдена`);
      return null;
    }

    const html = cleanHTML(section.outerHTML);
    const styles = extractStyles();

    return {
      html: html,
      css: styles,
      sectionId: sectionId
    };
  }

  // Функция для копирования в буфер обмена
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Ошибка копирования:', err);
      return false;
    }
  }

  // Генерация пошаговой инструкции для Tilda
  function generateTildaInstructions() {
    const instructions = `
═══════════════════════════════════════════════════════
  ИНСТРУКЦИЯ ПО ПЕРЕНОСУ САЙТА В TILDA ZERO BLOCK
═══════════════════════════════════════════════════════

📋 ШАГ 1: ПОДГОТОВКА
──────────────────────────────────────────────────────
1. Откройте редактор Tilda
2. Создайте новую страницу или откройте существующую
3. Добавьте блок "Zero Block" (T123)

📋 ШАГ 2: ЭКСПОРТ СЕКЦИЙ
──────────────────────────────────────────────────────
В консоли браузера выполните команды:

// Экспорт Hero секции (главный экран)
exportSection('home');

// Экспорт секции "О нас"
exportSection('about');

// Экспорт меню
exportSection('menu');

// Экспорт галереи
exportSection('gallery');

// Экспорт формы бронирования
exportSection('booking');

// Экспорт контактов
exportSection('contacts');

📋 ШАГ 3: ИМПОРТ В TILDA
──────────────────────────────────────────────────────
Для каждой секции:

1. В Zero Block нажмите "Add" → "HTML"
2. Вставьте HTML код секции
3. Нажмите "Add" → "CSS" 
4. Вставьте CSS стили
5. Настройте позиционирование элементов в визуальном редакторе

📋 ШАГ 4: НАСТРОЙКА АДАПТИВНОСТИ
──────────────────────────────────────────────────────
1. Переключитесь на Mobile View в Tilda
2. Настройте расположение элементов для мобильных
3. Проверьте на планшете (Tablet View)

📋 ШАГ 5: НАСТРОЙКА НАВИГАЦИИ
──────────────────────────────────────────────────────
1. В Tilda Settings → Navigation
2. Добавьте якорные ссылки на секции:
   - #home → Главная
   - #about → О нас
   - #menu → Меню
   - #gallery → Галерея
   - #booking → Бронирование
   - #contacts → Контакты

📋 ШАГ 6: ЗАМЕНА ФУНКЦИОНАЛЬНОСТИ
──────────────────────────────────────────────────────
React-компоненты нужно заменить на Tilda-виджеты:

• Форма бронирования → Tilda Form Block (T171)
• Кнопки → Tilda Button (настроить в редакторе)
• Иконки → Font Awesome или загрузить как SVG

📋 ШАГ 7: ШРИФТЫ
──────────────────────────────────────────────────────
Добавьте Google Fonts в настройках страницы:
- Open Sans
- Montserrat

Site Settings → Fonts → Add Google Font

📋 ШАГ 8: ТЕСТИРОВАНИЕ
──────────────────────────────────────────────────────
✓ Проверьте все ссылки
✓ Протестируйте формы
✓ Проверьте на мобильных устройствах
✓ Проверьте скорость загрузки

═══════════════════════════════════════════════════════

⚠️  ВАЖНЫЕ ЗАМЕЧАНИЯ:
──────────────────────────────────────────────────────
• Анимации нужно настроить через Tilda Animation
• Tailwind CSS классы нужно заменить на обычный CSS
• React-компоненты не работают в Tilda
• Некоторые стили могут конфликтовать с Tilda CSS

═══════════════════════════════════════════════════════
`;

    console.log(instructions);
    return instructions;
  }

  // Функция экспорта секции
  window.exportSection = function(sectionId) {
    console.log(`\n%c📦 Экспорт секции: ${sectionId}`, 'font-size: 16px; color: #00ffff; font-weight: bold;');
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`❌ Секция "${sectionId}" не найдена на странице`);
      return;
    }

    // Получаем HTML
    const html = section.innerHTML;
    
    // Получаем computed styles для секции
    const computedStyle = window.getComputedStyle(section);
    const styles = [];
    
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      styles.push(`${prop}: ${computedStyle.getPropertyValue(prop)};`);
    }

    const output = `
<!-- ==================== -->
<!-- СЕКЦИЯ: ${sectionId.toUpperCase()} -->
<!-- ==================== -->

<!-- HTML ДЛЯ TILDA ZERO BLOCK -->
<div id="${sectionId}" class="section-${sectionId}">
${html}
</div>

<!-- CSS ДЛЯ TILDA ZERO BLOCK -->
<style>
.section-${sectionId} {
  ${styles.join('\n  ')}
}

/* Базовые стили для секции */
#${sectionId} {
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  #${sectionId} {
    padding: 40px 15px;
  }
}
</style>

<!-- ИНСТРУКЦИЯ -->
<!-- 
1. Скопируйте HTML код выше
2. В Tilda Zero Block: Add → HTML → вставьте код
3. Скопируйте CSS код выше
4. В Tilda Zero Block: Add → CSS → вставьте стили
5. Настройте элементы в визуальном редакторе
-->
`;

    copyToClipboard(output).then(success => {
      if (success) {
        console.log('%c✅ Код секции скопирован в буфер обмена!', 'font-size: 14px; color: #00ff00;');
        console.log('%cВставьте код в Tilda Zero Block', 'font-size: 12px; color: #ffff00;');
      } else {
        console.log('%c⚠️  Не удалось скопировать автоматически. Скопируйте код ниже вручную:', 'font-size: 14px; color: #ff9900;');
        console.log(output);
      }
    });
  };

  // Функция экспорта всего сайта
  window.exportFullSite = function() {
    console.log('\n%c🌐 Экспорт всего сайта', 'font-size: 18px; color: #ff00ff; font-weight: bold;');
    
    const sections = ['home', 'about', 'menu', 'gallery', 'booking', 'contacts'];
    let fullExport = `
═══════════════════════════════════════════════════════
  ПОЛНЫЙ ЭКСПОРТ САЙТА GRAF-IN ДЛЯ TILDA
═══════════════════════════════════════════════════════

Этот файл содержит все секции сайта.
Создайте отдельный Zero Block для каждой секции.

`;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        fullExport += `\n\n<!-- ========== СЕКЦИЯ: ${sectionId.toUpperCase()} ========== -->\n`;
        fullExport += `<div id="${sectionId}">\n${section.innerHTML}\n</div>\n`;
      }
    });

    // Добавляем общие стили
    fullExport += `\n\n<!-- ========== ОБЩИЕ СТИЛИ ========== -->\n<style>\n`;
    fullExport += `
/* Импорт шрифтов */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Montserrat:wght@700;800;900&display=swap');

/* Базовые стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background: #ffffff;
  color: #000000;
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Анимации */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
.animate-slide-in-right { animation: slideInRight 0.8s ease-out; }
.animate-fade-in { animation: fadeIn 1s ease-out; }
.animate-zoom-in { animation: zoomIn 0.6s ease-out; }

/* Адаптивность */
@media (max-width: 768px) {
  .container { padding: 0 15px; }
  h1 { font-size: 48px !important; }
  h2 { font-size: 36px !important; }
}
</style>
`;

    copyToClipboard(fullExport).then(success => {
      if (success) {
        console.log('%c✅ Полный экспорт скопирован в буфер обмена!', 'font-size: 14px; color: #00ff00;');
      } else {
        console.log('%c⚠️  Не удалось скопировать. Код выведен ниже:', 'font-size: 14px; color: #ff9900;');
        console.log(fullExport);
      }
    });
  };

  // Показываем инструкцию
  generateTildaInstructions();

  // Доступные команды
  console.log('%c\n📌 ДОСТУПНЫЕ КОМАНДЫ:', 'font-size: 16px; color: #00ffff; font-weight: bold;');
  console.log('');
  console.log('%cexportSection("home")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт главной секции');
  console.log('');
  console.log('%cexportSection("about")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт секции "О нас"');
  console.log('');
  console.log('%cexportSection("menu")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт меню');
  console.log('');
  console.log('%cexportSection("gallery")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт галереи');
  console.log('');
  console.log('%cexportSection("booking")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт формы бронирования');
  console.log('');
  console.log('%cexportSection("contacts")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт контактов');
  console.log('');
  console.log('%cexportFullSite()', 'color: #ffff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт всего сайта целиком');
  console.log('');
  console.log('%c⚡ Готово! Используйте команды выше для экспорта секций', 'font-size: 14px; color: #00ff00; font-weight: bold;');

})();
