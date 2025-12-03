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

  // Конвертер Tailwind CSS в обычный CSS
  function convertTailwindToCSS(classNames) {
    const tailwindMap = {
      // Layout
      'container': 'max-width: 1200px; margin: 0 auto; padding: 0 20px;',
      'flex': 'display: flex;',
      'grid': 'display: grid;',
      'hidden': 'display: none;',
      'block': 'display: block;',
      'inline-block': 'display: inline-block;',
      'min-h-screen': 'min-height: 100vh;',
      'aspect-square': 'aspect-ratio: 1 / 1;',
      'overflow-hidden': 'overflow: hidden;',
      
      // Flexbox & Grid
      'items-center': 'align-items: center;',
      'items-start': 'align-items: flex-start;',
      'justify-between': 'justify-content: space-between;',
      'justify-center': 'justify-content: center;',
      'gap-2': 'gap: 0.5rem;',
      'gap-4': 'gap: 1rem;',
      'gap-6': 'gap: 1.5rem;',
      'gap-8': 'gap: 2rem;',
      'gap-12': 'gap: 3rem;',
      'gap-16': 'gap: 4rem;',
      'flex-1': 'flex: 1;',
      
      // Grid columns
      'grid-cols-2': 'grid-template-columns: repeat(2, 1fr);',
      'grid-cols-3': 'grid-template-columns: repeat(3, 1fr);',
      'grid-cols-4': 'grid-template-columns: repeat(4, 1fr);',
      'md:grid-cols-2': '@media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }',
      'md:grid-cols-3': '@media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }',
      'md:grid-cols-4': '@media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }',
      'lg:grid-cols-4': '@media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); }',
      
      // Spacing
      'p-4': 'padding: 1rem;',
      'p-6': 'padding: 1.5rem;',
      'p-8': 'padding: 2rem;',
      'px-4': 'padding-left: 1rem; padding-right: 1rem;',
      'py-4': 'padding-top: 1rem; padding-bottom: 1rem;',
      'py-8': 'padding-top: 2rem; padding-bottom: 2rem;',
      'py-20': 'padding-top: 5rem; padding-bottom: 5rem;',
      'pt-32': 'padding-top: 8rem;',
      'pb-20': 'padding-bottom: 5rem;',
      'mt-1': 'margin-top: 0.25rem;',
      'mt-12': 'margin-top: 3rem;',
      'mt-20': 'margin-top: 5rem;',
      'mb-1': 'margin-bottom: 0.25rem;',
      'mb-2': 'margin-bottom: 0.5rem;',
      'mb-3': 'margin-bottom: 0.75rem;',
      'mb-4': 'margin-bottom: 1rem;',
      'mb-6': 'margin-bottom: 1.5rem;',
      'mb-8': 'margin-bottom: 2rem;',
      'mb-12': 'margin-bottom: 3rem;',
      'ml-2': 'margin-left: 0.5rem;',
      
      // Sizing
      'w-full': 'width: 100%;',
      'w-8': 'width: 2rem;',
      'h-full': 'height: 100%;',
      'h-5': 'height: 1.25rem;',
      'w-5': 'width: 1.25rem;',
      'max-w-2xl': 'max-width: 42rem;',
      'max-w-4xl': 'max-width: 56rem;',
      
      // Typography
      'text-xs': 'font-size: 0.75rem; line-height: 1rem;',
      'text-sm': 'font-size: 0.875rem; line-height: 1.25rem;',
      'text-lg': 'font-size: 1.125rem; line-height: 1.75rem;',
      'text-xl': 'font-size: 1.25rem; line-height: 1.75rem;',
      'text-2xl': 'font-size: 1.5rem; line-height: 2rem;',
      'text-5xl': 'font-size: 3rem; line-height: 1;',
      'text-6xl': 'font-size: 3.75rem; line-height: 1;',
      'font-bold': 'font-weight: 700;',
      'font-semibold': 'font-weight: 600;',
      'font-medium': 'font-medium: 500;',
      'uppercase': 'text-transform: uppercase;',
      'tracking-wider': 'letter-spacing: 0.05em;',
      'leading-none': 'line-height: 1;',
      'text-center': 'text-align: center;',
      
      // Colors
      'bg-background': 'background-color: #ffffff;',
      'bg-foreground': 'background-color: #000000;',
      'bg-muted': 'background-color: #f5f5f5;',
      'text-background': 'color: #ffffff;',
      'text-foreground': 'color: #000000;',
      'text-muted-foreground': 'color: #666666;',
      'border-border': 'border-color: #e5e5e5;',
      'border-foreground': 'border-color: #000000;',
      
      // Borders
      'border': 'border-width: 1px; border-style: solid;',
      'border-2': 'border-width: 2px; border-style: solid;',
      'border-t': 'border-top-width: 1px; border-top-style: solid;',
      'border-b': 'border-bottom-width: 1px; border-bottom-style: solid;',
      
      // Effects
      'backdrop-blur-md': 'backdrop-filter: blur(12px);',
      'shadow': 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);',
      'hover:opacity-60': 'transition: opacity 0.2s; &:hover { opacity: 0.6; }',
      'hover:scale-110': 'transition: transform 0.5s; &:hover { transform: scale(1.1); }',
      'hover:border-foreground': '&:hover { border-color: #000000; }',
      'hover:bg-foreground': '&:hover { background-color: #000000; }',
      'hover:text-background': '&:hover { color: #ffffff; }',
      'group-hover:translate-x-1': '.group:hover & { transform: translateX(0.25rem); }',
      'group-hover:text-background/70': '.group:hover & { color: rgba(255, 255, 255, 0.7); }',
      
      // Transitions & Animations
      'transition-opacity': 'transition-property: opacity; transition-duration: 0.2s;',
      'transition-transform': 'transition-property: transform; transition-duration: 0.3s;',
      'transition-all': 'transition-property: all; transition-duration: 0.3s;',
      'duration-300': 'transition-duration: 0.3s;',
      'duration-500': 'transition-duration: 0.5s;',
      'duration-700': 'transition-duration: 0.7s;',
      'animate-slide-in-left': 'animation: slideInLeft 0.8s ease-out;',
      'animate-slide-in-right': 'animation: slideInRight 0.8s ease-out;',
      'animate-fade-in': 'animation: fadeIn 1s ease-out;',
      'animate-zoom-in': 'animation: zoomIn 0.6s ease-out;',
      
      // Position
      'fixed': 'position: fixed;',
      'relative': 'position: relative;',
      'absolute': 'position: absolute;',
      'top-0': 'top: 0;',
      'left-0': 'left: 0;',
      'right-0': 'right: 0;',
      'z-50': 'z-index: 50;',
      'z-10': 'z-index: 10;',
      
      // Responsive
      'md:flex': '@media (min-width: 768px) { display: flex; }',
      'md:hidden': '@media (min-width: 768px) { display: none; }',
      'md:text-2xl': '@media (min-width: 768px) { font-size: 1.5rem; line-height: 2rem; }',
      'md:text-6xl': '@media (min-width: 768px) { font-size: 3.75rem; line-height: 1; }',
      'lg:text-[160px]': '@media (min-width: 1024px) { font-size: 160px; }',
      'md:text-[120px]': '@media (min-width: 768px) { font-size: 120px; }',
      'text-[80px]': 'font-size: 80px;',
    };

    const styles = [];
    const mediaQueries = [];
    
    classNames.split(' ').forEach(className => {
      const cleanClass = className.trim();
      if (tailwindMap[cleanClass]) {
        const cssRule = tailwindMap[cleanClass];
        if (cssRule.includes('@media')) {
          mediaQueries.push(cssRule);
        } else {
          styles.push(cssRule);
        }
      }
    });

    return { styles: styles.join(' '), mediaQueries };
  }

  // Функция для конвертации всего элемента
  function convertElementStyles(element) {
    const className = element.getAttribute('class') || '';
    const { styles, mediaQueries } = convertTailwindToCSS(className);
    
    const uniqueId = 'tilda-' + Math.random().toString(36).substr(2, 9);
    element.setAttribute('data-tilda-id', uniqueId);
    
    let css = `.${uniqueId} { ${styles} }\n`;
    
    if (mediaQueries.length > 0) {
      mediaQueries.forEach(mq => {
        const match = mq.match(/@media ([^{]+) \{ ([^}]+) \}/);
        if (match) {
          css += `@media ${match[1]} { .${uniqueId} { ${match[2]} } }\n`;
        }
      });
    }
    
    return css;
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

  // Функция экспорта секции с конвертацией Tailwind
  window.exportSection = function(sectionId) {
    console.log(`\n%c📦 Экспорт секции: ${sectionId}`, 'font-size: 16px; color: #00ffff; font-weight: bold;');
    console.log('%c🔄 Конвертация Tailwind CSS → обычный CSS...', 'font-size: 12px; color: #ffff00;');
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`❌ Секция "${sectionId}" не найдена на странице`);
      return;
    }

    // Клонируем секцию для обработки
    const sectionClone = section.cloneNode(true);
    
    // Собираем все элементы с классами
    const allElements = [sectionClone, ...sectionClone.querySelectorAll('[class]')];
    let convertedCSS = '';
    
    allElements.forEach(element => {
      const className = element.getAttribute('class');
      if (className) {
        const { styles } = convertTailwindToCSS(className);
        const uniqueClass = 'tilda-' + sectionId + '-' + Math.random().toString(36).substr(2, 6);
        
        if (styles) {
          convertedCSS += `\n.${uniqueClass} {\n  ${styles.replace(/;/g, ';\n  ')}\n}\n`;
          element.classList.add(uniqueClass);
        }
      }
    });

    // Получаем HTML
    const html = sectionClone.innerHTML;
    
    // Получаем computed styles для секции
    const computedStyle = window.getComputedStyle(section);
    const baseStyles = [];
    
    const importantProps = ['padding', 'margin', 'background-color', 'border', 'min-height'];
    importantProps.forEach(prop => {
      const value = computedStyle.getPropertyValue(prop);
      if (value && value !== 'none' && value !== '0px') {
        baseStyles.push(`${prop}: ${value};`);
      }
    });

    const output = `
<!-- ==================== -->
<!-- СЕКЦИЯ: ${sectionId.toUpperCase()} -->
<!-- ✅ Tailwind CSS автоматически конвертирован -->
<!-- ==================== -->

<!-- HTML ДЛЯ TILDA ZERO BLOCK -->
<div id="${sectionId}" class="section-${sectionId}">
${html}
</div>

<!-- CSS ДЛЯ TILDA ZERO BLOCK (Конвертировано из Tailwind) -->
<style>
/* Базовые стили секции */
.section-${sectionId} {
  ${baseStyles.join('\n  ')}
}

#${sectionId} {
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
}

/* Конвертированные Tailwind классы */
${convertedCSS}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  #${sectionId} {
    padding: 40px 15px;
  }
  #${sectionId} h1 {
    font-size: 48px !important;
  }
  #${sectionId} h2 {
    font-size: 36px !important;
  }
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
</style>

<!-- ИНСТРУКЦИЯ -->
<!-- 
1. ✅ Tailwind CSS автоматически конвертирован в обычный CSS
2. Скопируйте HTML код выше
3. В Tilda Zero Block: Add → HTML → вставьте код
4. Скопируйте CSS код выше
5. В Tilda Zero Block: Add → CSS → вставьте стили
6. Настройте элементы в визуальном редакторе Tilda
7. Проверьте адаптивность на мобильных устройствах
-->
`;

    copyToClipboard(output).then(success => {
      if (success) {
        console.log('%c✅ Код секции скопирован в буфер обмена!', 'font-size: 14px; color: #00ff00;');
        console.log('%c✅ Tailwind классы конвертированы в обычный CSS', 'font-size: 12px; color: #00ff00;');
        console.log('%c→ Вставьте код в Tilda Zero Block', 'font-size: 12px; color: #ffff00;');
        console.log('');
        console.log('%c📊 Статистика конвертации:', 'font-size: 12px; color: #00ffff;');
        console.log(`   Элементов обработано: ${allElements.length}`);
        console.log(`   CSS правил создано: ${convertedCSS.split('\n').filter(l => l.includes('{')).length}`);
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
  console.log('  → Экспорт главной секции (Hero)');
  console.log('');
  console.log('%cexportSection("about")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт секции "О нас" с карточками');
  console.log('');
  console.log('%cexportSection("menu")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт меню ресторана');
  console.log('');
  console.log('%cexportSection("gallery")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт галереи изображений');
  console.log('');
  console.log('%cexportSection("booking")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт формы бронирования');
  console.log('');
  console.log('%cexportSection("contacts")', 'color: #00ff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт контактов и карты');
  console.log('');
  console.log('%cexportFullSite()', 'color: #ffff00; font-family: monospace; font-size: 14px;');
  console.log('  → Экспорт всего сайта целиком');
  console.log('');
  console.log('%c✨ НОВАЯ ФУНКЦИЯ: Автоматическая конвертация Tailwind → CSS!', 'font-size: 13px; color: #ff00ff; font-weight: bold;');
  console.log('%c   Все Tailwind классы будут автоматически преобразованы', 'font-size: 11px; color: #ff99ff;');
  console.log('%c   в обычный CSS, готовый для использования в Tilda!', 'font-size: 11px; color: #ff99ff;');
  console.log('');
  console.log('%c⚡ Готово! Используйте команды выше для экспорта секций', 'font-size: 14px; color: #00ff00; font-weight: bold;');

})();