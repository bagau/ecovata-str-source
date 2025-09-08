# Сайт Эковата-Стр - Статический Gatsby

Статический сайт компании "Эковата-Стр" на основе Gatsby, мигрированный с WordPress.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск разработки
npm run develop

# Сборка для продакшн
npm run build
```

## ✍️ Добавление нового контента

### Создание новой статьи

**Способ 1: Через скрипт**

```bash
./new-article.sh "Утепление дома в Уфе"
```

**Способ 2: Вручную**

1. Создайте файл в `content/blog/2025-09-07-new-article.md`
2. Используйте шаблон:

```markdown
---
title: "Название статьи"
date: "2025-09-07"
category: "nashi_raboty"
featured: false
excerpt: "Краткое описание..."
---

# Заголовок

Ваш контент...
```

### Создание новой страницы

1. Создайте файл в `src/pages/new-page.tsx`
2. Используйте шаблон:

```tsx
import React from "react";
import Layout from "../components/Layout";

const NewPage = () => {
  return (
    <Layout>
      <h1>Новая страница</h1>
      <p>Содержимое страницы...</p>
    </Layout>
  );
};

export default NewPage;
```

## 📁 Структура проекта

```
src/
  components/       # Компоненты React
  pages/           # Страницы сайта
  templates/       # Шаблоны для генерации страниц
  styles/          # CSS стили

content/
  blog/            # Статьи в формате Markdown
  pages/           # Страницы в формате Markdown

public/            # Готовый сайт (генерируется автоматически)
```

## 🎨 Редактирование дизайна

- **Layout компонент:** `src/components/Layout.tsx`
- **Главная страница:** `src/pages/index.tsx`
- **Шаблон статьи:** `src/templates/blog-post.tsx`
- **Стили:** `src/styles/`

## 📸 Добавление изображений

1. Поместите изображения в `static/images/`
2. Используйте в markdown:

```markdown
![Описание](../static/images/photo.jpg)
```

## 🚀 Деплой на GitHub Pages

```bash
# Сборка сайта
npm run build

# Деплой (автоматически через GitHub Actions)
git push origin main
```

## 📞 Контакты в статьях

Используйте этот блок в конце каждой статьи:

```markdown
## Контакты

Если вам нужно утепление дома, звоните:

- 📞 +7 (917) 428-37-07
- 📞 +7 (962) 526-70-25
```

## 🔧 Полезные команды

```bash
# Очистка кэша
npm run clean

# Проверка GraphQL запросов
# http://localhost:8000/___graphql

# Создание новой статьи
./new-article.sh "Название"

# Просмотр в браузере
# http://localhost:8000
```

## ❓ FAQ

**Q: Как добавить новую категорию?**  
A: Используйте поле `category` в frontmatter статьи

**Q: Как изменить контакты в шапке?**  
A: Отредактируйте `src/components/Layout.tsx`

**Q: Как добавить новую страницу в меню?**  
A: Отредактируйте навигацию в `src/components/Layout.tsx`
