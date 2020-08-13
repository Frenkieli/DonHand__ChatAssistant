/**
 * @description 製作line對應的temp
 * @author frenkie
 * @date 2020-08-12
 */
export default class LineFlexTempMaker {
  constructor() { }
  static airMaker(weatherData: Array<weatherLocationElementObject>, airQualityData: Array<airObject>,local: string): replyMessage {
    let replyMessage: replyMessage;
    let replyContent: Array<object> = [];
    for (let i = 0; i < airQualityData.length; i++) {
      let v: airObject = airQualityData[i];
      let color = {
        text : '#000000',
        color : ''
      };
      if (v.AQI <= 50) {
        color.color = '#00ff00';
      } else if (v.AQI <= 100) {
        color.color = '#FFFF00';
      } else if (v.AQI <= 150) {
        color.color = '#FF7E00';
      } else if (v.AQI <= 200) {
        color.color = '#FF0000';
      } else if (v.AQI <= 300) {
        color.text = '#ffffff';
        color.color = '#800080';
      } else if (v.AQI <= 500) {
        color.text = '#ffffff';
        color.color = '#7E0023';
      } else {
        break;
      }
      let airTemp: any =   {
        "type": "bubble",
        "hero": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "空氣品質:",
              "color": color.text
            },
            {
              "type": "text",
              "text": v.Status,
              "align": "end",
              "color": color.text
            }
          ],
          "backgroundColor": color.color,
          "paddingAll": "10px"
        }
      };
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
      // console.log(weatherData[0], '天氣的資料', weatherData)
      airTemp.body = {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "天氣狀況:"
              },
              {
                "type": "text",
                "text": weatherData[0].time[0].parameter.parameterName,
                "align": "end"
              }
            ],
            "paddingStart": "0px",
            "paddingEnd": "0px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "降雨機率:"
              },
              {
                "type": "text",
                "text": weatherData[1].time[0].parameter.parameterName + "%",
                "align": "end"
              }
            ],
            "paddingStart": "0px",
            "paddingEnd": "0px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "溫度:"
              },
              {
                "type": "text",
                "contents": [
                  {
                    "type": "span",
                    "text": weatherData[2].time[0].parameter.parameterName + "°C"
                  },
                  {
                    "type": "span",
                    "text": " ~ "
                  },
                  {
                    "type": "span",
                    "text": weatherData[4].time[0].parameter.parameterName + "°C"
                  }
                ],
                "align": "end"
              }
            ],
            "paddingStart": "0px",
            "paddingEnd": "0px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "舒適度:"
              },
              {
                "type": "text",
                "text": weatherData[3].time[0].parameter.parameterName,
                "align": "end"
              }
            ],
            "paddingStart": "0px",
            "paddingEnd": "0px"
          },
          {
            "type": "text",
            "text": "6:00 AM/PM後天氣預測:",
            "color": "#333333",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": weatherData[0].time[1].parameter.parameterName,
            "align": "end",
            "color": "#333333",
            "weight": "bold"
          }
        ],
        "paddingEnd": "10px",
        "paddingStart": "10px",
        "paddingTop": "5px",
        "paddingBottom": "3px",
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