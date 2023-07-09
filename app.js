// 내 api 정보 가져오기
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 실제 gpt-api 호출
async function runCompletion() {    // runCompletion 함수를 호출함으로써 안에 api가 실행되는 구조
    const completion = await openai.createChatCompletion({  // createChatCompletion을 실행시켜서 completion 만듦
        model: "gpt-3.5-turbo",     // model에 사용할 api code를 입력, 우리는 gpt-3.5-turbo 사용
        // messages: 안에 우리가 질문할 내용을 적어야 되는데 양식은 아래와 같음. role에는 3 가지가 있는데, system은 gpt가 어떤 역할을 해주었으면 하는지를,
        // assistant는 이전 응답을 저장해서 캐시처럼 사용하는 느낌, user는 우리가 직접 메시지를 전달하는 부분
        messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "gpt-3.5-turbo 모델은 텍스트 감정분석이 가능해?" }],   
    });
    console.log(completion.data.choices[0].message);
}
runCompletion();
