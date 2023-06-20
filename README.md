# RU

## О проекте
Данные инструкции и файлы предназначены для маршрутизации трафика при использовании чистого сервера Shadowsocks или [Outline](https://getoutline.org/ru/ "Download Outline"). Указанные инструкции могут быть недействительны, а клиенты могут не поддерживать работу с вашим сервером, если он использует плагины, вроде v2ray и так далее: в этом случае ищите способы и клиенты самостоятельно. 
Файлы строились по принципу blacklist: всё, что не указано в списке, маршрутизируется напрямую. Это обеспечивает одновременно быструю работу не заблокированных сервисов, бесперебойную работу сервисов, ограниченных GeoIP (Госуслуги, Авито и т. д.), и одновременно работу сервисов, заблокированных на территории РФ. 
Такая настройка обеспечивает лёгкость работы в интернете, но ***не обеспечивает анонимность***. Если вам необходима анонимность - используйте клиенты VPN, полностью маршрутизирующие весь трафик, с функцией killswitch. Или форкайте данный репозиторий под себя и самостоятельно настраивайте его по принципу whitelist.

На текущий момент здесь есть настройки для:
* [Shadowsocks для Windows](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo")
* ~~[Shadowsocks для Linux](https://snapcraft.io/shadowsocks-electron "Shadowsocks-electron on snapcraft")~~
* ~~Shadowsocks для MacOS~~
* [Расширения для браузера SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif "SwitchyOmega for Google Chrome")
* [Shadowsocks для Android](https://play.google.com/store/apps/details?id=com.github.shadowsocks "Shadowsocks in Google Play")
* [Shadowlink для iOS](https://apps.apple.com/us/app/shadowlink-shadowsocks-proxy/id1439686518) (временно не автоматизировано)

Так как сценарий настройки удалённый, любые изменения в списке сценариев синхронизируются с программой на ПК, приложением на Android или с расширением для браузера **(кроме персонально указанных инструкций)**.

## Shadowsocks для Windows
1. Установить [Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo")  из официального репозитория и прописать сервер
2. В настройках удалённого PAC указать ссылку на PAC файл
3. У системного прокси сервера включить режим работы - Сценарий настройки (PAC)

Ссылка на PAC файл: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.pac

## Shadowsocks для Linux
1. Установить Shadowsocks-electron: `sudo snap install shadowsocks-electron`

TODO: дописать и отладить работу SS на Linux

## Proxy SwitchyOmega для браузера
1. Установить [Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo") из официального репозитория и прописать сервер
2. Установить [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif "SwitchyOmega for Google Chrome")
3. Создать новый профиль - PAC Profile
4. Указать ссылку на PAC файл в соответствующей строке
5. Сохранить изменения
6. Настроить auto switch по желанию
   1. Создать новый профиль - proxy
   2. Прописать значения SOCKS5 127.0.0.1 1080
   3. Создать новый профиль - auto switch
   4. Указать маршрутизацию по умолчанию - PAC Profile
   5. Сохранить изменения
7. Выбрать необходимый профиль (PAC или auto switch)

Ссылка на PAC файл: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.pac

**Внимание:** убедитесь, что Shadowsocks работает на порту 1080! Этот порт захардкоден и в PAC файл, поэтому менять смысла нет

**Внимание №2:** профиль auto switch нужен чтобы в 2 клика перенаправить не открывающийся сайт через прокси. Для этого и создаётся профиль proxy, чтобы было на что перенаправлять трафик. ***Если нашли нужный сайт, заблокированный в России - отправьте его мне, чтобы я добавил его в список***

**Внимание №3:** если вы используете удалённый PAC в расширении, то его не обязательно настраивать в самом Shadowsocks. В этом случае системный прокси-сервер можно поставить на "отключён". Однако, если вы планируете через auto switch делать свою маршрутизацию и у вас уже указан PAC файл в ShadowSocks - настройка PAC профиля в SwitchyOmega всё ещё обязательна.

## Shadowsocks для Android
1. Установить [Shadowsocks из Google Play](https://play.google.com/store/apps/details?id=com.github.shadowsocks "Shadowsocks in Google Play") и прописать сервер
2. В настройках сервера указать маршрут - Пользовательские правила
3. Зайти в пользовательские правила -> добавить правило -> URL конфигурации и указать ссылку на ACL файл

Ссылка на ACL файл: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.acl

## Shadowlink для iOS
1. Установить [Shadowlink из AppStore](https://apps.apple.com/us/app/shadowlink-shadowsocks-proxy/id1439686518). **Отказаться от всех навязываемых подписок и пробных периодов**: нас не интересуют сервера по умолчанию, мы добавляем собственную конфигурацию
2. Прописать собственный сервер. К сожалению, в отличие от SS для ПК и Android, данное приложение требует QR код. Для этого просто загоняем ссылку вида ss://<base64_info> в генератор QR кодов на компьютере, а потом сканируем с айфона конфигурацию
3. Заходим в Proxy Rule, импортируем файл конфигурации

Ссылка на файл конфигурации: https://github.com/An-Eugene/ss_conditions/raw/main/ss_conditions.conf

**Внимание**: ввиду ограничений платформы, файл настройки здесь не удалённый и требует ручного скачивания каждый раз, когда список обновляется

К сожалению, в виду отсутствия девайса, нормально отладить импорт правил для устройств Apple пока не вышло. Возможно, в будущем добавлю нормальное решение, если найду.

# EN
TODO: write description in english
