import axios from 'axios'
import { get } from '../utils/http'
import { getTian } from '../utils/http'

/**
 * 给女朋友发送内容的相关接口
 */
enum LoveMsgURL {
  // 天气接口：默认获取最近7天的数据
  weather = 'http://api.tianapi.com/tianqi/index',
  // 国家气象局天气接口-杭州
  weatherHangZhou = 'http://www.weather.com.cn/data/cityinfo/101210101.html',
  // 每日简报
  dailyBriefing = 'http://api.tianapi.com/bulletin/index',
  // 今日头条
  topNews = 'http://api.tianapi.com/topnews/index',
  // 最美宋词
  songLyrics = 'http://api.tianapi.com/zmsc/index',
  // 每日一句美好英语
  dayEnglish = 'http://api.tianapi.com/everyday/index',
  // 韩寒主编的ONE一个杂志，本接口返回每日一句
  oneMagazines = 'http://api.tianapi.com/one/index',
  // 故事大全
  storybook = 'http://api.tianapi.com/story/index',
  // 网易云热评
  netEaseCloud = 'http://api.tianapi.com/hotreview/index',
  // 获取农历信息
  lunarDate = 'http://api.tianapi.com/lunar/index',
  // 土味情话
  saylove = 'http://api.tianapi.com/saylove/index',
  // 彩虹屁
  caihongpi = 'http://api.tianapi.com/caihongpi/index',
  // 励志古言
  inspirationalWord = 'http://api.tianapi.com/lzmy/index',
  // 笑话
  joke = 'http://api.tianapi.com/joke/index',
  // 一言
  oneWord = 'https://v1.hitokoto.cn/?encode=json',
}

class API {
  key: string
  constructor(key?: string) {
    this.key = key || '' // 为了方便，key在 http中统一添加
  }

  getKey() {
    return this.key
  }

  /**
   * 接口 ++++++++++
   */

  // 天气
  async getWeather(city_name: string): Promise<IWeatherResponseProps> {
    const res = await getTian({ url: LoveMsgURL.weather, params: { city: city_name } })
    // const res = [  {
    //   area: '杭州',
    //   date: '2022-03-07',
    //   week: '星期一',
    //   weather: '小雨转晴',
    //   weatherimg: 'qing.png',
    //   real: '3℃',
    //   lowest: '3℃',
    //   highest: '11℃',
    //   wind: '北风',
    //   winddeg: '0',
    //   windspeed: '3',
    //   windsc: '1-2级',
    //   sunrise: '06:20',
    //   sunset: '18:02',
    //   moonrise: '08:57',
    //   moondown: '22:29',
    //   pcpn: '1.0',
    //   pop: '55',
    //   uv_index: '2',
    //   vis: '24',
    //   humidity: '87',
    //   tips: '天气凉，适宜着一到两件羊毛衫、大衣、毛套装、皮夹克等春秋着装；年老体弱者宜着风衣加羊毛衫等厚型春秋着装。晴天紫外线等级较高，外出注意补水防晒。疫情防控不松懈，出门请佩戴口罩 。'
    // }]
    console.log(res)
    return res?.[0]
  }
  // 杭州天气
  async getWeatherHangZhouMock(city_code: string): Promise<IChinaWeatherResponse | null> {
    const res = {
      weatherinfo: {
        city: '杭州',
        cityid: '101210101',
        city_code: city_code,
        temp1: '-1℃',
        temp2: '3℃',
        weather: '暴雨',
        img1: 'n10.gif',
        img2: 'd10.gif',
        ptime: '18:00'
      }
    }
    return res;
  }
  async getWeatherHangZhou(city_code: string): Promise<IChinaWeatherResponse | null> {
    // const res = await get({ url: LoveMsgURL.weatherHangZhou })
    // console.log('res:' + res)
    // console.log(res.get('weatherinfo'))
    // return res
    try {
      const response = await axios(LoveMsgURL.weatherHangZhou, { timeout: 30000 })
      // console.log(response)
      // console.log(response.status)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // 每日简报
  async getDailyBriefing() {
    const res = await getTian<DailyBriefing[]>({ url: LoveMsgURL.dailyBriefing })
    return res
  }

  // 今日头条
  async getTianTopNews() {
    const res = await getTian<TodayHeadlines[]>({ url: LoveMsgURL.topNews })
    return res
  }

  // 最美宋词
  async getSongLyrics() {
    const res = await getTian<IVerseProps[]>({ url: LoveMsgURL.songLyrics })
    return res?.[0]
  }

  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // one一个杂志
  async getOneMagazines() {
    const res = await getTian<OneMagazines[]>({ url: LoveMsgURL.oneMagazines })
    return res?.[0]
  }

  // 故事大全
  async getStorybook() {
    const res = await getTian<StorybookProps[]>({ url: LoveMsgURL.storybook })
    return res?.[0]
  }

  // 网易云热评
  async getNetEaseCloud() {
    const res = await getTian<NetEaseCloudProps[]>({ url: LoveMsgURL.netEaseCloud })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    // const res =[
    //   {
    //     "gregoriandate": "2022-03-07",
    //     "lunardate": "2022-2-5",
    //     "lunar_festival": "",
    //     "festival": "",
    //     "fitness": "交易.立券.会友.签约.纳畜",
    //     "taboo": "种植.置业.卖田.掘井.造船",
    //     "shenwei": "喜神：东北 福神：正北 财神：正北阳贵：正北 阴贵：西南 ",
    //     "taishen": "占在门,厕道莫修移胎神在外正东停留5天",
    //     "chongsha": "羊日冲(癸丑)牛",
    //     "suisha": "岁煞西",
    //     "wuxingjiazi": "金",
    //     "wuxingnayear": "金箔金",
    //     "wuxingnamonth": "金箔金",
    //     "xingsu": "南方张月鹿-吉",
    //     "pengzu": "己不破券 未不服药",
    //     "jianshen": "定",
    //     "tiangandizhiyear": "壬寅",
    //     "tiangandizhimonth": "癸卯",
    //     "tiangandizhiday": "己未",
    //     "lmonthname": "仲春",
    //     "shengxiao": "虎",
    //     "lubarmonth": "二月",
    //     "lunarday": "初五",
    //     "jieqi": ""
    //   }
    // ]
    return res?.[0]
  }

  // 土味情话
  async getSaylove() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.saylove })
    return res?.[0]
  }

  // 彩虹屁
  async getCaihongpi() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.caihongpi })
    return res?.[0]
  }

  // 雷人笑话
  async getJoke(num = 6) {
    const res = await getTian<JokeProps[]>({ url: LoveMsgURL.joke, params: { num } })
    return res
  }

  // 一言
  async getOneWord(): Promise<OneWordProps | null> {
    try {
      const response = await axios(LoveMsgURL.oneWord, { timeout: 30000 })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export default new API()
