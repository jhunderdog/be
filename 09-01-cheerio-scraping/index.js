import axios from "axios"
import cheerio from 'cheerio'

async function createBoardAPI(mydata) {
    // 1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
    const myurl = mydata.contents
      .split(' ')
      .filter((el) => el.includes('http'))[0]; // https://daum.net
      // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html코드 받아오기 => 스크래핑
    const result = await axios.get(myurl);
    console.log(result.data)

    const $ = cheerio.load(result.data);
    $('meta').each((_, el) => {
        if($(el).attr("property")){
            const key = $(el).attr("property").split(":")[1]
            const value = $(el).attr("content")
            console.log(key, value);
        }
    })

}
const frontendData = {
    title: "댐",
    contents: " 홀리 싯 https://daum.net 로 좀 오세요"
}

await createBoardAPI(frontendData)

createBoardAPI(frontendData)