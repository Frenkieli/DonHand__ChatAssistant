type lineEventName = 'follow' | 'message' | 'unfollow';
interface lineEventType {
  follow: Function,
  message: Function,
  unfollow: Function,
}

type lineMessageEventName = 'text' | 'image';
interface lineMessageEventType {
  text: Function,
  image: Function,
}

type lineMessageCommandEventName = 'h' | 'y2b' | 'meme' | 'jpg' | 'air';
interface lineMessageCommandEventType {
  h: Function,
  y2b: Function,
  meme: Function,
  delme: Function,
  jpg: Function,
  air: Function,
}

interface lineEventSource {
  userId: string,
  type: string,
}
interface lineEventMessage {
  type: lineMessageEventName,
  id: string,
  text: string
  contentProvider: any,
  stickerId: number,
  packageId: number,
  stickerResourceType: string,
}
interface lineEvent {
  type: lineEventName,
  replyToken: string,
  source: lineEventSource,
  timestamp: number,
  mode: string,
  message: lineEventMessage
}

interface lineUserData {
  userId: string,
  displayName: string,
  pictureUrl: string,
  statusMessage: string,
  language: string,
  following?: boolean
}

interface lineBaseClass {
  request : any,
  config : object,
  client : any,
  fsItem : object,
  db : object,
  getLineUserData : Function,
  getLineMessageImages : Function,
}

type replyMessage = object | Array<object> | null;