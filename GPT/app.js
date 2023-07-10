const fs = require('fs');

// 내 api 정보 가져오기
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const context = `대학 총장 절반 이상이 현행 대학수학능력시험(수능)을 자격고사 시험으로 전환하는 것이 바람직하다고 보는 것으로 조사됐다. 9일 교육부 출입기자단이 전국 4년제 대학 총장 86명을 대상으로 설문조사한 결과를 보면, 응답자 51.8%가 향후 대입 개편안과 관련해 수능을 자격고사화해야 한다고 답했다. 현행 수능은 9등급제 상대평가를 뼈대로 한다. 수능 위주 전형(정시)은 수능 점수로 대입 지원자를 한줄 세우기 하는 것이어서, 입시 경쟁을 과열시키고 사교육을 부추긴다는 지적이 끊이지 않았다. 이를 자격고사화하자는 건 최소한의 대입 자격 확인 시험으로 바꾸는 것을 말한다. 이렇게 되면 수능이 절대평가로 전환되고, 입시에서 대학의 자율성이 확대될 여지가 생긴다.

그동안 대학 입장에서도 수능 위주 전형이 달갑지 않았다. 수능에서 한두 문제를 더 맞히면 서열이 더 높은 대학으로 갈아탈 수 있기 때문에, 반수·삼반수에 나서는 학생들이 많은 탓이다. 학생들의 빈자리가 늘어날수록 안정적인 학사운영이 어렵다. 대학알리미 공시를 보면, 2021학년도 기준 4년제 일반대학 재적 학생 193만여명 가운데 중도 탈락자는 9만5천여명에 이른다. 대학 입학 뒤 중도 포기한 경우를 입학전형별로 비교하면 수능 위주 전형이 가장 많았다는 연구분석 결과도 나와 있다.

현행 수능 제도를 개편해야 할 이유는 차고 넘친다. 2028학년도 대입부터는 고교학점제가 전면 도입되는 2025년 이후 고등학교를 다닌 학생들이 응시하게 된다. 상대평가 수능을 그대로 두면, 진로·적성에 따라 원하는 과목을 배우고 일정 학점을 채우면 졸업할 수 있도록 하는 고교학점제의 취지를 살리기 어렵다. 1~2점이라도 입시에 유리한 과목으로의 쏠림 현상이 나타날 것이기 때문이다.

정부는 원래 올해 상반기까지 2028학년도 대입 개편안 시안을 낸다고 했었지만, 느닷없는 ‘킬러 문항’ 소동으로 약속을 지키지 못했다. 새로운 대입 제도는 고등교육법이 정하는 4년 전 예고제에 따라, 늦어도 내년 2월까지는 공표돼야 한다. 대학 서열화가 고착화된 상황에서 대입 제도를 근본적으로 개편하려면 사회적 합의가 전제돼야 하기 때문에 남은 시간이 빠듯하다. 변별력만 강조된 수능을 제대로 고치려면, 향후 교과 평가에 대한 방향성부터 의견을 모아야 한다. 이미 다양한 교육 전문가들이 제시한 개편안이 여럿 나와 있다. 정부는 사회적 공론화 작업을 서둘러야 한다.`


const asdf = `앞으로 내가 제시하는 글들을 분석해서 밑에 정해놓은 양식에 맞게 답변해줘
1. 제시된 글에 대한 전체적인 감정분석을 "긍정(x%) - 부정(y%) " 형식으로 보여줘
2. 1번 결과가 도출된 이유를 제시된 글을 인용해서 문장형식으로 상세하게 설명해줘
3. 제시된 글에서 언급된 키워드의 빈도수를 계산해서 내림차순으로 "키워드 : 1. 키워드1 - 10번
2. 키워드2 - 8번
3. 키워드3 - 6번
" 이와 같은 양식에 맞춰 표시해줘

`

// 실제 gpt-api 호출
async function runCompletion() {    // runCompletion 함수를 호출함으로써 안에 api가 실행되는 구조
    const completion = await openai.createChatCompletion({  // createChatCompletion을 실행시켜서 completion 만듦
        model: "gpt-3.5-turbo",     // model에 사용할 api code를 입력, 우리는 gpt-3.5-turbo 사용
        // messages: 안에 우리가 질문할 내용을 적어야 되는데 양식은 아래와 같음. role에는 3 가지가 있는데, system은 gpt가 어떤 역할을 해주었으면 하는지를,
        // assistant는 이전 응답을 저장해서 캐시처럼 사용하는 느낌, user는 우리가 직접 메시지를 전달하는 부분
        messages: [{ "role": "system", "content": "너는 정확한 분석을 해주는 분석가야." }, {
            role: "user", content: asdf + context }],
    });
    var msg = completion.data.choices[0].message['content'];
    console.log(msg);
    // fs.readdir('data', (err, files) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     var lens = files.length;
    //     var filename = `data/question${lens + 1}.txt`;
    //     fs.writeFile(filename, msg, (err) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log("Create Success");
    //         }
    //     });
    // });
}
runCompletion();