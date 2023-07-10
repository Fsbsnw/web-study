const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI({ openAIApiKey: "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", temperature: 1, maxTokens: -1});
const msg = `앞으로 내가 제시하는 글들을 분석해서 밑에 정해놓은 양식에 맞게 답변해줘
1. 제시된 글에 대한 전체적인 감정분석을 "긍정(x%) - 부정(y%) " 형식으로 보여줘
2. 1번 결과가 도출된 이유를 제시된 글을 인용해서 문장형식으로 상세하게 설명해줘
3. 제시된 글에서 언급된 키워드의 빈도수를 계산해서 내림차순으로 "키워드 : 1. 키워드1 - 10번
2. 키워드2 - 8번
3. 키워드3 - 6번
" 이와 같은 양식에 맞춰 표시해줘`

async function runCompletion() {
    const res = await model.call(
        msg +
        `대학 총장 절반 이상이 현행 대학수학능력시험(수능)을 자격고사 시험으로 전환하는 것이 바람직하다고 보는 것으로 조사됐다. 9일 교육부 출입기자단이 전국 4년제 대학 총장 86명을 대상으로 설문조사한 결과를 보면, 응답자 51.8%가 향후 대입 개편안과 관련해 수능을 자격고사화해야 한다고 답했다. 현행 수능은 9등급제 상대평가를 뼈대로 한다. 수능 위주 전형(정시)은 수능 점수로 대입 지원자를 한줄 세우기 하는 것이어서, 입시 경쟁을 과열시키고 사교육을 부추긴다는 지적이 끊이지 않았다. 이를 자격고사화하자는 건 최소한의 대입 자격 확인 시험으로 바꾸는 것을 말한다. 이렇게 되면 수능이 절대평가로 전환되고, 입시에서 대학의 자율성이 확대될 여지가 생긴다.

그동안 대학 입장에서도 수능 위주 전형이 달갑지 않았다. `
    );
    console.log(res);
}

runCompletion();