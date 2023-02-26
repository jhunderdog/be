import express from 'express'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from "cors"
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from './email.js';
import mongoose from 'mongoose';
import { Board } from './models/board.model.js';
import { Stock } from './stock.model.js';


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', async (req, res) => {
  console.log("zzz");
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   {
  //     number: 1,
  //     writer: '철수',
  //     title: '제목입니다~~',
  //     contents: '내용이에요@@@',
  //   },
  //   {
  //     number: 2,
  //     writer: '영희',
  //     title: '영희 제목입니다~~',
  //     contents: '영희 내용이에요@@@',
  //   },
  //   {
  //     number: 3,
  //     writer: '훈이',
  //     title: '훈이 제목입니다~~',
  //     contents: '훈이 내용이에요@@@',
  //   },
  // ];
  const result = await Board.find()
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post('/boards', async (req, res) => {
  console.log(req.body);

  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })
  await board.save()

  // 2. 저장 결과 응답 주기
  res.send('게시물 등록에 성공하였습니다!!');
});

app.post('/users', (req, res) => {
  console.log(req.body);
  const user = req.body.myuser;
  console.log(user);
  const isValid = checkValidationEmail(user.email)
  if(isValid){
    const mytemplate = getWelcomeTemplate(user);
    sendWelcomeTemplateToEmail(user.email, mytemplate);
    res.send("가입완료!!!");
  }
});



app.post('/tokens/phone', (req, res) => {
	// req.body 객체의 myphone의 값을 myphone이라는 변수에 담기.
  console.log(req.body);
  const myphone = req.body.aaa;
  
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send('인증완료!!!');
  }
});

app.get("/stocks", async (req, res) => {
  const stocks = await Stock.find()
  res.send(stocks);
})

// 몽고 DB 접속!!
mongoose.connect("mongodb://my-database:27017/mydocker03")
// Backend API 서버 오픈!!

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`);
});