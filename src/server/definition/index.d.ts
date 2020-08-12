///<reference path="./lineEventType.d.ts" />
///<reference path="./schemaModels.d.ts" />

type configDB = {
  host :string,
  port : number,
  db : string
}
type configLine = {
  channelAccessToken : string,
  channelSecret :string
}
type configImgur = {
  clientID : string,
  clientSecret :string
}

interface configItem {
  version: string,
  env: string,
  port: string,
  db: configDB,
  line: configLine,
  imgur: configImgur,
  // 現在測試和線上部屬有固定IP的設定
  serverIP: string,
  googleApiKey: string,
  mongoDB: string
}

type airObject = {
  SiteName: string,
  County: string,
  AQI: number,
}