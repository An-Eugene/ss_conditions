[![ru](https://img.shields.io/badge/language-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-blue.svg)](https://github.com/an-eugene/ss_conditions/blob/master/.github/README.md)
[![en](https://img.shields.io/badge/language-english-red.svg)](https://github.com/an-eugene/ss_conditions/blob/master/.github/README-en.md)

## О проекте
Данные инструкции и файлы предназначены для маршрутизации трафика при использовании чистого сервера Shadowsocks или [3x-ui](https://github.com/MHSanaei/3x-ui). Указанные инструкции могут быть недействительны, а клиенты могут не поддерживать работу с вашим сервером, если он использует плагины, вроде v2ray и так далее: в этом случае ищите способы и клиенты самостоятельно. 
Файлы строились по принципу blacklist: всё, что не указано в списке, маршрутизируется напрямую. Это обеспечивает одновременно быструю работу не заблокированных сервисов, бесперебойную работу сервисов, ограниченных GeoIP (Госуслуги, Авито и т. д.), и одновременно работу сервисов, заблокированных на территории РФ. 
Такая настройка обеспечивает лёгкость работы в интернете, но ***не обеспечивает анонимность***. Если вам необходима анонимность - используйте клиенты VPN, полностью маршрутизирующие весь трафик, с функцией killswitch. Или форкайте данный репозиторий под себя и самостоятельно настраивайте его по принципу whitelist.

На текущий момент можно настроить:
* [Shadowsocks для Windows](#shadowsocks-для-windows)
* ~~[Shadowsocks для Linux](#shadowsocks-для-linux)~~
* ~~[Shadowsocks для MacOS](#shadowsocks-для-macos)~~
* [Shadowsocks для Android](#shadowsocks-для-android)
* [Клиент Shadowsocks для iOS](#клиент-shadowsocks-для-ios)
  - [Shadowrocket для iOS](#shadowrocket-для-ios-оптимальное-но-платное-решение) (платно)
  - ~~[Shadowlink для iOS](#shadowlink-для-ios-неавтоматическое-но-бесплатное-решение) (бесплатно)~~ приложение было удалено из Appstore

Так как сценарий настройки удалённый, любые изменения в списке сценариев синхронизируются с программой на ПК, приложением на Android или с расширением для браузера **(кроме персонально указанных инструкций)**.

## Для тех, кто хочет форкнуть
Вносите в своём форке изменения в /rules/rules_proxy, так они автоматически применятся для всех конфигов, чтобы не пришлось каждый править вручную.
Если хотите сделать форк не для того, чтобы не зависеть от этого репозитория, а чтобы внести 1-2 сайта, которых здесь пока нет - лучше создайте issue, тогда я внесу его среди прочих. Подходят как сайты, которые заблокированы только у некоторых операторов, так и сайты, которые сами блокируют подключения с российских IP адресов.

Просьба, не присылать сайты, которые заблокированы не в России. Если вы живёте не в России - лучше сделайте форк со своим актуальным списком.

## Shadowsocks для Windows
1. Установить [Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo")  из официального репозитория и прописать сервер
2. В настройках удалённого PAC указать ссылку на PAC файл
3. У системного прокси сервера включить режим работы - Сценарий настройки (PAC)

Ссылка на PAC файл: [https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.pac](https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.pac)


## Shadowsocks для Linux
1. Установить Clash: `sudo apt install clash`
2. Прописать PAC файл, если он вообще работает

TODO: дописать и отладить работу SS на Linux


## ~~Shadowsocks для MacOS~~
1. ~~Установить [Shadowsocks](https://github.com/shadowsocks/ShadowsocksX-NG)~~
К сожалению, заставить работать ShadowsocksX-NG на MacOS не получилось


## Shadowsocks для Android
1. Установить [Shadowsocks из Google Play](https://play.google.com/store/apps/details?id=com.github.shadowsocks "Shadowsocks in Google Play") и прописать сервер
2. В настройках сервера указать маршрут - Пользовательские правила
3. Зайти в пользовательские правила -> добавить правило -> URL конфигурации и указать ссылку на ACL файл

Ссылка на ACL файл: [https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.acl](https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.acl)

## Клиент ShadowSocks для iOS
### Shadowrocket для iOS (оптимальное, но платное решение)
1. Купить и установить [Shadowrocket из AppStore](https://apps.apple.com/us/app/shadowrocket/id932747118) (250р).
2. Прописать собственный сервер
3. Зайти во вкладку "Настройка" -> Добавить файл конфигурации -> указать ссылку на .CONF файл
4. На главной странице выбрать "Global Routing" -> Config

Ссылка на CONF файл: [https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions_shadowrocket.conf](https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions_shadowrocket.conf)

### ~~Shadowlink для iOS (неавтоматическое, но бесплатное решение)~~
~~1. Установить [Shadowlink из AppStore](https://apps.apple.com/us/app/shadowlink-shadowsocks-proxy/id1439686518 "Shadowlink for iOS"). **Отказаться от всех навязываемых подписок и пробных периодов**: нас не интересуют сервера по умолчанию, мы добавляем собственную конфигурацию~~
~~2. Прописать собственный сервер. К сожалению, в отличие от SS для ПК и Android, данное приложение требует QR код. Для этого просто загоняем ссылку вида ss://<base64_info> в [генератор QR кодов](https://webqr.com/create.html) на компьютере, а потом сканируем с айфона конфигурацию~~
~~3. Заходим в Proxy Rule, импортируем CONF файл конфигурации~~

~~Ссылка на скачивание файла: https://an-eugene.github.io/ss_conditions/site/ss.html~~

~~**Внимание**: ввиду ограничений платформы, файл настройки здесь не удалённый и требует ручного скачивания каждый раз, когда список обновляется~~

Приложение было удалено из Appstore, единственный оставшийся вариант - платное решение выше

## Proxy SwitchyOmega для браузера (устаревшее)
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

Ссылка на PAC файл: [https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.pac](https://raw.githubusercontent.com/An-Eugene/ss_conditions/refs/heads/main/ss_conditions.pac)

**Внимание:** убедитесь, что Shadowsocks работает на порту 1080! Этот порт захардкоден и в PAC файл, поэтому менять смысла нет

**Внимание №2:** профиль auto switch нужен чтобы в 2 клика перенаправить не открывающийся сайт через прокси. Для этого и создаётся профиль proxy, чтобы было на что перенаправлять трафик. ***Если нашли нужный сайт, заблокированный в России - отправьте его мне, чтобы я добавил его в список***

**Внимание №3:** если вы используете удалённый PAC в расширении, то его не обязательно настраивать в самом Shadowsocks. В этом случае системный прокси-сервер можно поставить на "отключён". Однако, если вы планируете через auto switch делать свою маршрутизацию и у вас уже указан PAC файл в ShadowSocks - настройка PAC профиля в SwitchyOmega всё ещё обязательна.
