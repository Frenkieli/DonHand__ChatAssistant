
type lineEventName = 'follow' | 'message' | 'unfollow';
type lineMessageEventName = 'text' | 'image';

interface lineEventType {
  follow: any,
  message: any,
  unfollow: any,
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