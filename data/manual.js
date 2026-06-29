/* AmneziaVPN deployment manual content. Prose is bilingual { ru, en };
   shell commands (`code`) are literal and never translated. */
window.MANUAL = {
    chrome: {
        docTitle: {
            ru: 'AmneziaVPN: памятка по развёртыванию | Sergey Aktush',
            en: 'AmneziaVPN Deployment Note | Sergey Aktush'
        },
        back: { ru: 'На главную', en: 'Back to main page' },
        kicker: { ru: 'Скрытая техническая памятка', en: 'Hidden Technical Note' },
        title: { ru: 'Памятка по развёртыванию AmneziaVPN', en: 'AmneziaVPN Deployment Manual' },
        intro: {
            ru: 'Аккуратная памятка по созданию отдельного SSH-пользователя для установки AmneziaVPN: ключи, sudo, отключение паролей, проверка и наблюдение за логами.',
            en: 'A tidy note on creating a dedicated SSH user for installing AmneziaVPN: keys, sudo, disabling passwords, verification, and watching the logs.'
        },
        checklistLabel: { ru: 'Подготовка', en: 'Prerequisites' },
        copy: { ru: 'Копировать', en: 'Copy' },
        copied: { ru: 'Скопировано', en: 'Copied' }
    },

    checklist: [
        {
            label: { ru: 'Нужно заранее', en: 'You need first' },
            text: {
                ru: 'VPS с root-доступом, IP сервера, локальный macOS/Linux терминал.',
                en: 'A VPS with root access, the server IP, and a local macOS/Linux terminal.'
            }
        },
        {
            label: { ru: 'Цель', en: 'Goal' },
            text: {
                ru: 'Отдельный пользователь `amnezia_user`, вход только по ключу, sudo без пароля для установки.',
                en: 'A dedicated `amnezia_user`, key-only login, and passwordless sudo for the install.'
            }
        },
        {
            label: { ru: 'Проверка', en: 'Check' },
            text: {
                ru: '`ssh -i ~/.ssh/amnezia_key amnezia_user@your_server_ip` и `sudo whoami`.',
                en: '`ssh -i ~/.ssh/amnezia_key amnezia_user@your_server_ip` and `sudo whoami`.'
            }
        }
    ],

    steps: [
        {
            num: '01',
            title: { ru: 'Локальная машина', en: 'Local machine' },
            desc: {
                ru: 'Генерируем ED25519-ключ и копируем публичную часть на сервер. Если ключ уже есть, этот шаг можно пропустить или выбрать другое имя файла.',
                en: 'Generate an ED25519 key and copy the public part to the server. If you already have a key, skip this step or pick another file name.'
            },
            code: 'ssh-keygen -t ed25519 -f ~/.ssh/amnezia_key\nssh-copy-id -i ~/.ssh/amnezia_key.pub root@your_server_ip'
        },
        {
            num: '02',
            title: { ru: 'Сервер под root', en: 'Server as root' },
            desc: {
                ru: 'Создаём отдельного пользователя, даём sudo без пароля, переносим authorized keys и отключаем вход по паролю во всех SSH-конфигах.',
                en: 'Create a dedicated user, grant passwordless sudo, move the authorized keys over, and disable password login in all SSH configs.'
            },
            code: 'adduser amnezia_user\nusermod -aG sudo amnezia_user\necho "amnezia_user ALL=(ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/amnezia_user\n\nmkdir -p /home/amnezia_user/.ssh\ncp /root/.ssh/authorized_keys /home/amnezia_user/.ssh/\nchown -R amnezia_user:amnezia_user /home/amnezia_user/.ssh\nchmod 700 /home/amnezia_user/.ssh\nchmod 600 /home/amnezia_user/.ssh/authorized_keys\n\nsed -i \'s/^PasswordAuthentication.*/PasswordAuthentication no/\' /etc/ssh/sshd_config\nfind /etc/ssh/sshd_config.d/ -type f -exec sed -i \'s/PasswordAuthentication yes/PasswordAuthentication no/g\' {} +\nsystemctl restart ssh',
            note: {
                accent: false,
                title: { ru: 'Заметка о безопасности', en: 'Safety note' },
                text: {
                    ru: 'Не закрывай текущую root-сессию, пока не проверишь вход новым пользователем в отдельном терминале. Так проще восстановиться, если SSH-конфиг применился не так.',
                    en: 'Keep your current root session open until you have verified login as the new user in a separate terminal. That makes recovery easier if the SSH config applied incorrectly.'
                }
            }
        },
        {
            num: '03',
            title: { ru: 'Проверка доступа', en: 'Verify access' },
            desc: {
                ru: 'Заходим с конкретным ключом и проверяем, что sudo не спрашивает пароль. Ожидаемый ответ на `sudo whoami` — `root`.',
                en: 'Log in with the specific key and confirm sudo does not ask for a password. The expected reply to `sudo whoami` is `root`.'
            },
            code: 'ssh -i ~/.ssh/amnezia_key amnezia_user@your_server_ip\nsudo whoami',
            note: {
                accent: true,
                title: { ru: 'Приложение AmneziaVPN', en: 'AmneziaVPN app' },
                text: {
                    ru: 'При добавлении сервера укажи пользователя `amnezia_user` и приватный ключ `~/.ssh/amnezia_key`.',
                    en: 'When adding the server, set the user to `amnezia_user` and the private key to `~/.ssh/amnezia_key`.'
                }
            }
        },
        {
            num: '04',
            title: { ru: 'Наблюдение за установкой', en: 'Watch the install' },
            desc: {
                ru: 'Во время установки удобно смотреть системные логи авторизации и SSH. Почти все действия установки проходят через sudo.',
                en: 'During the install it helps to watch the system auth and SSH logs. Almost all install actions go through sudo.'
            },
            code: 'sudo journalctl -f -u ssh | grep sudo\nsudo tail -f /var/log/auth.log'
        },
        {
            num: '05',
            title: { ru: 'Мини-rollback', en: 'Mini rollback' },
            desc: {
                ru: 'Если нужно временно вернуть парольный вход, делай это только из уже открытой root-сессии и сразу после проверки причины.',
                en: 'If you need to temporarily restore password login, do it only from an already-open root session and right after confirming the reason.'
            },
            code: 'sed -i \'s/^PasswordAuthentication.*/PasswordAuthentication yes/\' /etc/ssh/sshd_config\nsystemctl restart ssh'
        }
    ]
};
