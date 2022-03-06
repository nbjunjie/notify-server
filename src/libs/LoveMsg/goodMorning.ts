/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'
import { textCardTemplate2 } from './templates/textcardHangZhou'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
    ])

    // 过滤掉异常数据
    const [sayLove, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const template = textCardTemplate({ ...weather, lunarInfo })
      console.log('weatherInfo', template)

      // 发送消息
      // await wxNotify(template)
    } else {
      console.log('weatherInfo:', weather)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// 天气信息-杭州
const weatherInfoHangZhou = async () => {
  try {
    const weather = await API.getWeatherHangZhou(CONFIG.city_code)
    if (weather) {
      // weather.ptime获取时间字符串
      // const date = '2022-02-06'
      // const lunarInfo = await API.getLunarDate(date)
      // const template = textCardTemplate({ ...weather, lunarInfo })
      console.log('weatherinfo:', weather.weatherinfo)
      console.log('city:', weather.weatherinfo.city)
      console.log('天气:', weather.weatherinfo.weather)
      const [lunar_festival, festival, lubarmonth, lunarday, jieqi] = ['七夕节','女神节', '二月', '二日', '龙抬头']        
      const lunarInfo: ResLunarDateProps = {
        lunar_festival,
        festival,
        lubarmonth,
        lunarday,
        jieqi,
      } 
      console.log(lunarInfo)
      const template = textCardTemplate2({ ...weather.weatherinfo, lunarInfo })
      console.log(template)
      // 发送消息
      await wxNotify(template)
    } else {
      console.log('weather:', weather)
    }
  } catch (error) {
    console.log('weather:err', error)
  }
}

// goodMorning
export const goodMorning = async () => {
  // await weatherInfo()
  await weatherInfoHangZhou()
  // await goodWord()
}
