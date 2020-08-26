# DonHand__ChatAssistant

主要功能是將line用戶上傳的梗圖整理到資料庫，在用戶發出需求時回傳。次要功能可以查詢天氣與空汙狀況等等（慢慢追加），可以解決用互臨時找不到梗圖時的麻煩，同時慢慢製作用於增強聊天話題與互動的額外功能！

使用技術
===
----------| framework | language   |
:---------|:----------|:-----------|
Frontend  | Vue       | JavaScript |
Backend   | Express   | TypeScript |
Bundler   | Webpack   | -----------|
Server    | Heroku    | -----------|

linehook 本地端測試可以用 ngrok 部屬後更換linehook網址後測試

## 檔案架構
分為三個資料夾和一個express的進入點

* [client](#client端) 用戶端檔案(express-view, vue和圖片等檔案)
* [server](#server端) 伺服器端檔案(express本體和相關邏輯)
* config 設定檔案，用戶端和伺服器端共用的設定檔案
* index.ts webpack的進入點，也是express的進入檔案

### client端
建製中

### server端
架構
* models 定義資料庫和操做資料庫相關的方法
* routes 定義外部路由與內部controller檔案的連接
* controller 主要操控邏輯，資料處理後轉存到models，或是輸出的檔案
* definition TypeScript定義檔案放置區域
* interface 與外部API等獲取資料時使用
* express.ts express本體，追加路由和使用套件在這邊做


## heroku 相關常用命令
系統變數
heroku config:set KEY=value 

部屬
git push heroku master

監看
heroku logs --tail

列舉
heroku logs -n 200