Вот пошаговый план настройки защищенного пользователя для AmneziaVPN.
# 1. На локальной машине (macOS)
Генерируем современный ключ ED25519 (лучший формат для Amnezia) и копируем его на сервер.

## Создаем ключ (если еще нет), на вопросы жать Enter
```bash
ssh-keygen -t ed25519 -f ~/.ssh/amnezia_key

```
## Копируем публичный ключ на сервер (замените user и ip)
```bash
ssh-copy-id -i ~/.ssh/amnezia_key.pub root@your_server_ip
```
------------------------------
# 2. На сервере (под пользователем root)
Создаем пользователя, даем права и настраиваем SSH.

```bash
## 1. Создаем пользователя (пароль вводим любой, он будет отключен)
adduser amnezia_user
## 2. Добавляем в группу sudo
usermod -aG sudo amnezia_user
## 3. Разрешаем sudo без пароля (создаем отдельный конфиг-файл)
echo "amnezia_user ALL=(ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/amnezia_user
## 4. Копируем SSH-ключи от root к новому пользователю
mkdir -p /home/amnezia_user/.ssh
cp /root/.ssh/authorized_keys /home/amnezia_user/.ssh/
chown -R amnezia_user:amnezia_user /home/amnezia_user/.ssh
chmod 700 /home/amnezia_user/.ssh
chmod 600 /home/amnezia_user/.ssh/authorized_keys
## 5. Отключаем пароли ВЕЗДЕ (включая cloud-init конфиги)
sed -i 's/^PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
find /etc/ssh/sshd_config.d/ -type f -exec sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' {} +
# 6. Применяем настройки
systemctl restart ssh
```
------------------------------
# 3. На локальной машине (Проверка)
Проверяем, что заходим под новым пользователем по ключу и имеем права sudo.

## Заходим с указанием конкретного ключа
```bash
ssh -i ~/.ssh/amnezia_key amnezia_user@your_server_ip
```
## Внутри проверяем sudo (не должно запрашивать пароль)
sudo whoami# Должно вывести: root

> Важный нюанс: В приложении AmneziaVPN при добавлении сервера укажите путь к приватному ключу ~/.ssh/amnezia_key и имя пользователя amnezia_user.

# 4. На сервере (под пользователем root или amnezia_user)
Мониторинг системного лога (Journal)
Почти все действия, требующие sudo (а установка VPN состоит из них целиком), записываются в системный журнал.
```bash
# Следить за всеми вызовами sudo в реальном времени
sudo journalctl -f -u ssh | grep sudo
# Или просто общий лог авторизации и команд
sudo tail -f /var/log/auth.log
```
