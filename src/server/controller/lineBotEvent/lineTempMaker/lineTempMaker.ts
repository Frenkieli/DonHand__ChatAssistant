/**
 * @description 製作line對應的temp
 * @author frenkie
 * @date 2020-08-12
 */

import airQualityLineTemp from './airQualityLineTemp.json';



export default class LineFlexTempMaker {
  constructor() { }
  static airQualityMaker(data: Array<airObject>, local: string): replyMessage {
    let replyMessage: replyMessage;
    let replyContent: Array<object> = [];
    for (let i = 0; i < data.length; i++) {
      let v: airObject = data[i];
      let airTemp: any = null;
      if (v.AQI <= 50) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[0]));
      } else if (v.AQI <= 100) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[1]));
      } else if (v.AQI <= 150) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[2]));
      } else if (v.AQI <= 200) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[3]));
      } else if (v.AQI <= 300) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[4]));
      } else if (v.AQI <= 500) {
        airTemp = JSON.parse(JSON.stringify(airQualityLineTemp[5]));
      } else {
        break;
      }
      airTemp.header = {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": "https://picsum.photos/200/150/?random=" + (i + 1),
            "position": "absolute",
            "size": "full",
            "offsetTop": "0px",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "gravity": "top",
            "aspectMode": "cover",
            "aspectRatio": "200:150"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": v.SiteName,
                "size": "4xl",
                "weight": "bold",
                "align": "center"
              },
              {
                "type": "text",
                "text": v.County,
                "align": "end",
                "weight": "bold",
                "size": "md",
                "style": "italic"
              }
            ],
            "backgroundColor": "#ffffffaa",
            "paddingAll": "10px",
            "cornerRadius": "20px",
            "paddingBottom": "0px",
            "paddingTop": "0px"
          }
        ],
        "position": "relative"
      }
      replyContent.push(airTemp);
    }
    if (replyContent.length <= 10) {
      replyMessage = {
        type: "flex",
        altText: local + "的空汙結果",
        contents: {
          type: "carousel",
          contents: replyContent
        }
      }
    } else {
      replyMessage = [{
        type: "flex",
        altText: local + "的空汙結果",
        contents: {
          type: "carousel",
          contents: replyContent.splice(0, 10)
        }
      }, {
        type: "flex",
        altText: local + "的空汙結果",
        contents: {
          type: "carousel",
          contents: replyContent
        }
      }]
    }
    return replyMessage;
  }
}