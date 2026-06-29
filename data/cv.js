/* Single source of truth for CV facts. Each text field is bilingual { ru, en }.
   Edit here to update content and both languages at once. */
window.CV = {
    cases: [
        {
            tags: ['AI Ops', 'Python · Telegram · Ollama'],
            title: {
                ru: 'AI-анализ рабочих Telegram-чатов',
                en: 'AI analysis for work Telegram chats'
            },
            desc: {
                ru: 'Инструмент выгружает историю чатов, бережно обходит лимиты Telegram, считает активность и формирует AI-отчеты по требованиям, рискам и незакрытым темам.',
                en: 'A tool that exports chat history, respects Telegram limits, measures activity, and produces AI reports on requirements, risks, and unresolved topics.'
            },
            result: {
                ru: 'Снизил ручной анализ на 85%.',
                en: 'Reduced manual analysis effort by 85%.'
            }
        },
        {
            tags: ['Knowledge', 'FastAPI · LangChain · Elasticsearch'],
            title: {
                ru: 'Ассистент по внутренней документации',
                en: 'Internal documentation assistant'
            },
            desc: {
                ru: 'RAG-контур: парсинг, очистка, индексация базы знаний и интерфейс вопрос-ответ для команды, которой нужен быстрый доступ к документации.',
                en: 'A RAG loop with parsing, cleaning, knowledge-base indexing, and a Q&A interface for teams that need fast access to product documentation.'
            },
            result: {
                ru: 'Сократил время поиска информации в 12 раз.',
                en: 'Cut information lookup time by 12x.'
            }
        },
        {
            tags: ['Data Export', 'REST API · CSV · JSON'],
            title: {
                ru: 'Экспорт и нормализация данных из трекера',
                en: 'Tracker data export and normalization'
            },
            desc: {
                ru: 'Слой моделей и экспортеров для выгрузки задач, проектов, пользователей, времени и связей в форматы для аналитики, миграций и отчетности.',
                en: 'Model and exporter layer for issues, projects, users, time entries, and relations in analysis-, migration-, and reporting-friendly formats.'
            },
            result: {
                ru: 'Автоматизировал процесс, который занимал 8 часов ручной работы в неделю.',
                en: 'Automated a process that took 8 hours of manual work per week.'
            }
        },
        {
            tags: ['Hardware API', 'UDP · DSP · Python'],
            title: {
                ru: 'Remote-control tooling для DSP-процессоров',
                en: 'Remote-control tooling for DSP processors'
            },
            desc: {
                ru: 'Драйвер и примеры управления аудиопроцессорами: уровни, mute, матрица маршрутизации, опрос состояния и команды по протоколу устройства.',
                en: 'Driver and examples for audio processor control: levels, mutes, routing matrix, state polling, and device-protocol commands.'
            },
            result: {
                ru: 'Включен в стандартный процесс настройки 40+ инсталляций.',
                en: 'Included in standard setup process for 40+ installations.'
            }
        },
        {
            tags: ['Bot Product', 'Telegram · API · DB'],
            title: {
                ru: 'Каталог продуктов внутри Telegram',
                en: 'Product catalog inside Telegram'
            },
            desc: {
                ru: 'Бот для поиска, навигации и показа карточек товаров из внешнего API с локальным кешем и понятной кнопочной логикой.',
                en: 'A bot for product search, navigation, and item cards from an external API with local cache and button-driven user flows.'
            },
            result: {
                ru: 'Обработал 2500+ запросов в первый месяц без сбоев.',
                en: 'Processed 2500+ requests in first month without incidents.'
            },
            wide: true
        }
    ],

    capabilities: [
        {
            icon: 'fa-magnifying-glass-chart',
            title: { ru: 'Discovery без лишнего', en: 'Discovery without theater' },
            desc: {
                ru: 'Быстро фиксирую контекст, ограничения и критерии результата. Дальше собираю первый рабочий контур.',
                en: 'Questions, success criteria, constraints, process map, and a fast prototype instead of long bureaucracy.'
            }
        },
        {
            icon: 'fa-plug-circle-bolt',
            title: { ru: 'API и интеграции', en: 'APIs and integrations' },
            desc: {
                ru: 'Разбираю протоколы, проверяю поведение, собираю понятные схемы и устойчивые интеграционные потоки.',
                en: 'I read protocols, test behavior, build clear diagrams, and connect products into working flows.'
            }
        },
        {
            icon: 'fa-robot',
            title: { ru: 'AI как рабочий инструмент', en: 'AI as a tool' },
            desc: {
                ru: 'Применяю LLM там, где это ускоряет работу: анализ переписок, поиск знаний, отчеты и внутренние помощники.',
                en: 'I use LLMs where they save real effort: chat analysis, knowledge search, reports, and internal assistants.'
            }
        },
        {
            icon: 'fa-people-arrows',
            title: { ru: 'Стыковка команд', en: 'Translation between people' },
            desc: {
                ru: 'Помогаю продажам, инженерам и пользователям говорить на одном языке, чтобы решения принимались быстрее и точнее.',
                en: 'I can speak with sales, engineers, partners, and users in a way that makes decisions more precise.'
            }
        }
    ],

    experience: [
        {
            date: { ru: '2025 — сейчас', en: '2025 — now' },
            role: { ru: 'Lead Presales Engineer · Yoonion', en: 'Lead Presales Engineer · Yoonion' },
            desc: {
                ru: 'Демо, пилоты, обучение, сбор требований, цикл обратной связи, документация, клиентские процессы и автоматизация повторяемых задач.',
                en: 'Demos, pilots, enablement, requirements, feedback loops, documentation, customer workflows, and automation for repeatable tasks.'
            }
        },
        {
            date: { ru: '2023 — сейчас', en: '2023 — now' },
            role: { ru: 'Engineering Group Lead · DIGIS', en: 'Engineering Group Lead · DIGIS' },
            desc: {
                ru: 'Управление инженерной группой, внутренние IT-продукты, тестирование API и протоколов, схемы, регламенты и экспертная оценка решений.',
                en: 'Engineering group coordination, internal IT products, API/protocol testing, diagrams, standards, and expert product evaluation.'
            }
        },
        {
            date: { ru: '2022 — 2023', en: '2022 — 2023' },
            role: { ru: 'Lead Presales Engineer · Pro Audio', en: 'Lead Presales Engineer · Pro Audio' },
            desc: {
                ru: 'Технические консультации, спецификации, акустические расчёты, концептуальные схемы подключений и поддержка партнёров.',
                en: 'Technical consulting, specifications, acoustic calculations, conceptual connection diagrams, and partner support.'
            }
        },
        {
            date: { ru: '2017 — 2022', en: '2017 — 2022' },
            role: { ru: 'Technical Director · Show Industry', en: 'Technical Director · Show Industry' },
            desc: {
                ru: 'Технические райдеры, звук/свет/видео, синхронизация контента, подрядчики, зарубежные туры и технические переговоры.',
                en: 'Riders, sound/light/video, content synchronization, vendors, international tours, and technical negotiations.'
            }
        }
    ],

    credentials: {
        ru: 'Образование: звукорежиссура кино и телевидения, ГИТР. Курс Python Developer, Skillbox. English B2.',
        en: 'Education: film and TV sound engineering, GITR. Python Developer course, Skillbox. English B2.'
    }
};
