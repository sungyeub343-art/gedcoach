// Generates the GED information pages under /info/ and sitemap-info.xml.
// Usage: node tools/build-info-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://gedcoach.kr';
const PHONE = '010-2928-3614';
const OG_IMAGE = `${SITE_URL}/images/ged-guide-og.jpg`;
const NOTICE = '<p class="info-notice">시험 일정·과목·응시 자격은 매년 교육부와 시·도교육청 공고에 따라 달라질 수 있습니다. 접수 전 거주 지역 교육청의 최신 공고를 꼭 확인하세요.</p>';

const pages = [
  {
    slug: 'schedule',
    name: '검정고시 시험 일정',
    title: '검정고시 시험 일정 | 연 2회 공고·접수·시험일·합격 발표 정리',
    description: '검정고시는 매년 4월과 8월, 연 2회 시행됩니다. 공고부터 원서 접수, 시험일, 합격자 발표까지 예년 일정 흐름과 시험별 준비 시작 시기를 정리했습니다.',
    lead: '검정고시는 보통 연 2회 시행됩니다. 예년 일정의 흐름을 알고 역산해서 준비하면 남은 기간을 훨씬 효율적으로 쓸 수 있습니다.',
    sections: [
      ['연 2회 시행되는 검정고시', `<p>초졸·중졸·고졸 검정고시는 시·도교육청 주관으로 1년에 두 번 시행됩니다. 예년에는 아래와 같은 흐름으로 진행되었습니다.</p>
        <div class="info-table-wrap"><table class="info-table"><thead><tr><th>구분</th><th>공고</th><th>원서 접수</th><th>시험</th><th>합격 발표</th></tr></thead><tbody>
        <tr><th>제1회</th><td>2월 초</td><td>2월 중순</td><td>4월 초·중순</td><td>5월 초</td></tr>
        <tr><th>제2회</th><td>6월 초</td><td>6월 중순</td><td>8월 초·중순</td><td>8월 말</td></tr>
        </tbody></table></div>
        <p>위 표는 예년 기준의 대략적인 시기입니다. 정확한 날짜는 해마다 교육청 공고로 확정됩니다.</p>`],
      ['원서 접수 기간을 놓치지 않으려면', `<ul><li>접수 기간은 보통 1주일 안팎으로 짧습니다. 공고가 나오면 바로 서류를 준비하세요.</li><li>최종 학력 증명서(졸업·제적 증명서)는 발급에 시간이 걸릴 수 있어 미리 받아 두는 것이 좋습니다.</li><li>응시 자격과 준비 서류는 <a href="application/">검정고시 응시 자격·접수 방법</a>에서 자세히 확인할 수 있습니다.</li></ul>`],
      ['시험일 기준 준비 시작 시기', `<p>기초가 어느 정도 있다면 시험 2~3개월 전, 학습 공백이 길다면 4~6개월 전부터 시작하는 것을 권합니다. 4월 시험이라면 전년도 겨울, 8월 시험이라면 봄부터 과목별 진단과 개념 정리를 시작하는 흐름이 안정적입니다.</p><p>기간별 계획은 <a href="study-plan/">검정고시 공부법</a>에서 정리했습니다.</p>`]
    ],
    faqs: [
      ['검정고시는 1년에 몇 번 보나요?', '보통 4월과 8월, 연 2회 시행됩니다. 정확한 시험일은 매년 시·도교육청 공고로 확정됩니다.'],
      ['1회 시험에 떨어지면 2회에 다시 볼 수 있나요?', '가능합니다. 60점 이상 받은 과목은 과목 합격으로 인정되어 다음 시험에서 면제를 신청할 수 있어 부족한 과목만 다시 준비하면 됩니다.'],
      ['다른 지역에서 시험을 볼 수 있나요?', '응시 지역과 접수 방식은 교육청마다 기준이 다르므로 응시하려는 지역 교육청의 공고를 확인해야 합니다.']
    ]
  },
  {
    slug: 'passing-score',
    name: '검정고시 합격 점수',
    title: '검정고시 합격 점수 | 평균 60점 합격 기준·과목 합격·고득점 전략',
    description: '검정고시는 전 과목 평균 60점 이상이면 합격입니다. 과목 합격과 면제, 결시 시 불합격 기준, 대학 진학을 위한 고득점 전략까지 정리했습니다.',
    lead: '검정고시 합격 기준은 단순하지만, 과목 합격 제도와 고득점이 필요한 경우를 함께 알아야 전략을 세울 수 있습니다.',
    sections: [
      ['합격 기준: 전 과목 평균 60점 이상', `<ul><li><strong>전체 합격</strong>: 응시한 전 과목 평균이 60점 이상이면 합격입니다.</li><li><strong>결시 주의</strong>: 평균이 60점을 넘어도 결시한 과목이 있으면 합격할 수 없습니다.</li><li><strong>과목 합격</strong>: 평균이 부족해 불합격하더라도 60점 이상 받은 과목은 과목 합격으로 인정되고, 다음 시험에서 해당 과목 면제를 신청할 수 있습니다.</li></ul>`],
      ['평균 60점을 만드는 과목 배분', `<p>모든 과목에서 60점을 넘길 필요는 없습니다. 사회·과학·한국사처럼 개념 암기로 점수를 올리기 쉬운 과목에서 평균을 끌어올리고, 수학·영어처럼 기초가 필요한 과목은 기본 유형을 확실히 맞히는 전략이 효율적입니다.</p><div class="info-table-wrap"><table class="info-table"><thead><tr><th>과목 성격</th><th>예시 과목</th><th>전략</th></tr></thead><tbody><tr><th>암기·개념형</th><td>사회, 과학, 한국사, 도덕</td><td>기출 반복으로 고득점 확보</td></tr><tr><th>기초 누적형</th><td>수학, 영어</td><td>자주 나오는 기본 유형 집중</td></tr><tr><th>독해형</th><td>국어</td><td>문법·문학 개념 + 기출 지문 연습</td></tr></tbody></table></div>`],
      ['대학 진학을 위한 고득점', `<p>검정고시 성적으로 수시에 지원하려면 합격선보다 훨씬 높은 점수가 필요합니다. 대학마다 검정고시 성적 반영 방식이 다르므로 목표 대학을 먼저 정하고 과목별 목표 점수를 세우는 것이 좋습니다. 자세한 내용은 <a href="after-ged/">검정고시 후 대학 진학</a>을 참고하세요.</p>`]
    ],
    faqs: [
      ['검정고시 합격 점수는 몇 점인가요?', '응시한 전 과목 평균 60점 이상이면 합격입니다. 단, 결시한 과목이 있으면 합격할 수 없습니다.'],
      ['과락이 있나요?', '평균 60점 이상이면 합격하는 방식이라 특정 과목 점수가 낮아도 평균으로 합격할 수 있습니다. 다만 결시 과목이 있으면 불합격입니다.'],
      ['이미 합격했는데 점수를 올리려고 다시 볼 수 있나요?', '대학 진학 등을 위해 고득점이 필요한 경우 재응시할 수 있는 제도가 있습니다. 세부 조건은 해당 연도 교육청 공고를 확인하세요.']
    ]
  },
  {
    slug: 'subjects',
    name: '검정고시 과목',
    title: '검정고시 과목 | 고졸·중졸·초졸 필수 과목과 선택 과목 정리',
    description: '고졸 검정고시는 필수 6과목과 선택 1과목, 중졸은 필수 5과목과 선택 1과목, 초졸은 필수 4과목과 선택 2과목입니다. 과목별 특징과 공부 포인트를 정리했습니다.',
    lead: '과정별 시험 과목과 선택 과목을 먼저 확인하고, 내게 유리한 선택 과목을 고르는 것부터 검정고시 준비가 시작됩니다.',
    sections: [
      ['과정별 시험 과목', `<div class="info-table-wrap"><table class="info-table"><thead><tr><th>과정</th><th>필수 과목</th><th>선택 과목</th></tr></thead><tbody>
        <tr><th>고졸 검정고시</th><td>국어, 수학, 영어, 사회, 과학, 한국사 (6과목)</td><td>도덕, 기술·가정, 체육, 음악, 미술 중 1과목</td></tr>
        <tr><th>중졸 검정고시</th><td>국어, 수학, 영어, 사회, 과학 (5과목)</td><td>도덕, 기술·가정, 정보, 체육, 음악, 미술 중 1과목</td></tr>
        <tr><th>초졸 검정고시</th><td>국어, 수학, 사회, 과학 (4과목)</td><td>도덕, 체육, 음악, 미술, 실과, 영어 중 2과목</td></tr>
        </tbody></table></div><p>모든 과목은 객관식으로 출제되며, 고등학교·중학교·초등학교 교육과정 수준에서 출제됩니다.</p>`],
      ['선택 과목은 어떻게 고를까', `<p>선택 과목은 암기량이 적고 기출 유형이 반복되는 과목이 유리합니다. 많은 수험생이 도덕을 선택하는 이유도 개념이 비교적 단순하고 기출 반복으로 점수를 만들기 쉽기 때문입니다. 다만 이미 잘 아는 분야가 있다면 그 과목이 더 유리할 수 있습니다.</p>`],
      ['과목별 공부 포인트', `<ul><li><strong>국어</strong>: 문법 개념과 교과서 수록 문학 작품, 기출 지문 독해를 함께 준비합니다.</li><li><strong>수학</strong>: 기본 계산과 자주 나오는 유형을 반복해 확실히 맞힐 문제를 늘립니다. 별도 안내는 <a href="../#subjects">과목별 코칭</a>에서 볼 수 있습니다.</li><li><strong>영어</strong>: 필수 어휘와 기본 문법을 익힌 뒤 짧은 지문 독해로 확장합니다.</li><li><strong>사회·과학·한국사</strong>: 핵심 개념을 정리하고 기출 선지를 반복해 고득점 과목으로 만듭니다.</li></ul>`]
    ],
    faqs: [
      ['고졸 검정고시는 몇 과목인가요?', '국어, 수학, 영어, 사회, 과학, 한국사 필수 6과목과 선택 1과목으로 총 7과목입니다.'],
      ['중졸 검정고시는 몇 과목인가요?', '국어, 수학, 영어, 사회, 과학 필수 5과목과 선택 1과목으로 총 6과목입니다.'],
      ['수학이 너무 어려운데 합격할 수 있나요?', '평균 60점 이상이면 합격이므로 다른 과목에서 점수를 확보하고 수학은 기본 유형 위주로 준비하면 충분히 합격할 수 있습니다.']
    ]
  },
  {
    slug: 'application',
    name: '검정고시 응시 자격·접수 방법',
    title: '검정고시 응시 자격·접수 방법 | 준비 서류·자퇴 후 6개월 기준',
    description: '검정고시 응시 자격, 학교 자퇴 후 응시 가능 시기, 원서 접수 방법과 준비 서류를 정리했습니다. 고졸·중졸 검정고시 접수 전에 확인하세요.',
    lead: '응시 자격이 안 되거나 서류가 빠지면 접수 자체가 어렵습니다. 공고가 나오기 전에 미리 확인해 두세요.',
    sections: [
      ['과정별 응시 자격', `<ul><li><strong>고졸 검정고시</strong>: 중학교 졸업 또는 그와 같은 수준의 학력이 있는 사람이 응시할 수 있습니다. 고등학교 재학 중에는 응시할 수 없습니다.</li><li><strong>중졸 검정고시</strong>: 초등학교 졸업 또는 그와 같은 수준의 학력이 있는 사람으로, 중학교 재학 중이 아닌 사람이 응시할 수 있습니다.</li><li><strong>초졸 검정고시</strong>: 초등학교에 재학하지 않는 일정 연령 이상의 사람이 응시할 수 있습니다.</li></ul>`],
      ['학교를 그만둔 경우: 6개월 기준', `<p>고등학교·중학교를 자퇴(제적)한 경우에는 보통 <strong>자퇴일로부터 해당 시험 공고일까지 6개월이 지나야</strong> 응시할 수 있습니다. 자퇴 시기에 따라 응시 가능한 회차가 달라지므로, 자퇴 날짜와 다음 공고일을 비교해 보세요.</p>`],
      ['원서 접수와 준비 서류', `<p>원서는 응시하려는 지역의 시·도교육청에서 접수하며, 방문 접수 외에 온라인 접수를 운영하는 경우도 있습니다. 일반적으로 아래 서류가 필요합니다.</p><ul><li>응시 원서 (교육청 양식)</li><li>최근 6개월 이내 촬영한 반명함판 사진</li><li>최종 학력 증명서 (졸업증명서, 제적증명서 등)</li><li>신분증</li><li>과목 합격·면제 대상자는 관련 증빙 서류</li></ul><p>세부 서류와 접수 방식은 교육청 공고마다 다를 수 있습니다.</p>`]
    ],
    faqs: [
      ['고등학교 자퇴 후 언제 검정고시를 볼 수 있나요?', '보통 자퇴일로부터 해당 시험 공고일까지 6개월이 지나야 응시할 수 있습니다. 정확한 기준은 공고를 확인하세요.'],
      ['검정고시 응시료가 있나요?', '검정고시는 일반적으로 응시 수수료 없이 접수합니다. 사진, 증명서 발급 비용 정도만 필요합니다.'],
      ['성인도 응시할 수 있나요?', '나이 제한 없이 학력 조건만 맞으면 성인도 응시할 수 있습니다. 실제로 직장인과 주부 등 많은 성인이 응시합니다.']
    ]
  },
  {
    slug: 'study-plan',
    name: '검정고시 공부법',
    title: '검정고시 공부법 | 기출문제 활용·독학 vs 과외·기간별 계획',
    description: '검정고시는 기출문제 반복이 핵심입니다. 진단부터 개념, 기출, 실전까지 기간별 공부 계획과 독학·과외 선택 기준, 과목별 공부 순서를 정리했습니다.',
    lead: '검정고시는 출제 범위가 넓지만 기출 유형이 반복되는 시험입니다. 순서만 잘 잡아도 공부 시간을 크게 줄일 수 있습니다.',
    sections: [
      ['4단계 공부 순서', `<ol><li><strong>진단</strong>: 최근 기출 1회분을 풀어 과목별 현재 점수와 약한 단원을 확인합니다.</li><li><strong>개념</strong>: 자주 나오는 단원부터 핵심 개념을 정리합니다. 전 범위를 처음부터 끝까지 보려고 하지 않는 것이 중요합니다.</li><li><strong>기출</strong>: 최근 5개년 정도의 기출을 반복해 풀고, 틀린 문제의 선지까지 다시 확인합니다.</li><li><strong>실전</strong>: 시험 시간에 맞춰 모의 풀이를 하고 마지막 2주는 오답과 암기 과목을 집중 복습합니다.</li></ol>`],
      ['기간별 공부 계획', `<div class="info-table-wrap"><table class="info-table"><thead><tr><th>남은 기간</th><th>추천 계획</th></tr></thead><tbody><tr><th>1개월</th><td>암기 과목과 기출 위주로 평균 60점 확보에 집중</td></tr><tr><th>2~3개월</th><td>1개월 개념 + 1~2개월 기출 반복, 수학·영어 기본 유형 보완</td></tr><tr><th>4~6개월</th><td>기초 개념부터 단계적으로, 고득점·대학 진학까지 고려한 계획</td></tr></tbody></table></div>`],
      ['독학과 과외, 무엇이 맞을까', `<p>기초가 있고 스스로 계획을 지킬 수 있다면 기출 중심 독학으로도 합격할 수 있습니다. 반대로 학습 공백이 길거나, 수학·영어 기초가 부족하거나, 혼자 공부하다 자주 멈춘다면 1:1 과외로 진단과 학습 관리를 받는 것이 시간을 아끼는 방법입니다.</p><p>거주 지역의 방문·화상 수업은 <a href="../cities/">지역별 검정고시 과외</a>에서 찾을 수 있습니다.</p>`]
    ],
    faqs: [
      ['검정고시 기출문제는 어디서 구하나요?', '각 시·도교육청 홈페이지에 지난 시험 문제와 정답이 공개되어 있습니다. 최근 5개년 정도를 반복해서 푸는 것을 권합니다.'],
      ['검정고시 독학으로 합격할 수 있나요?', '기초가 있다면 기출 중심 독학으로도 가능합니다. 학습 공백이 길거나 수학·영어 기초가 부족하다면 과외로 단기간에 보완하는 것이 효율적입니다.'],
      ['하루에 몇 시간 공부해야 하나요?', '남은 기간과 현재 수준에 따라 다르지만, 꾸준히 매일 2~3시간을 확보하면 2~3개월 안에 합격을 목표로 할 수 있는 경우가 많습니다.']
    ]
  },
  {
    slug: 'after-ged',
    name: '검정고시 후 대학 진학',
    title: '검정고시 후 대학 진학 | 수시·정시 지원 방법과 수능 준비',
    description: '고졸 검정고시 합격 후 대학에 가는 방법을 정리했습니다. 검정고시 성적으로 지원하는 수시, 수능 성적으로 지원하는 정시의 차이와 준비 순서를 확인하세요.',
    lead: '고졸 검정고시에 합격하면 고등학교 졸업자와 같은 학력으로 대학에 지원할 수 있습니다. 어떤 전형을 노릴지에 따라 준비 방법이 달라집니다.',
    sections: [
      ['수시와 정시, 두 가지 길', `<div class="info-table-wrap"><table class="info-table"><thead><tr><th>구분</th><th>주요 평가 요소</th><th>준비 포인트</th></tr></thead><tbody><tr><th>수시</th><td>검정고시 성적(대학별 환산), 면접·논술 등</td><td>검정고시 고득점, 대학별 지원 자격 확인</td></tr><tr><th>정시</th><td>수능 성적</td><td>국어·수학·영어·탐구 수능 대비</td></tr></tbody></table></div><p>수시는 대학·전형별로 검정고시 출신자의 지원 가능 여부와 성적 반영 방식이 다르므로 모집 요강 확인이 필수입니다.</p>`],
      ['정시를 준비한다면', `<p>검정고시 수준과 수능 수준은 난도 차이가 큽니다. 검정고시 합격 후 고등 과정의 빈틈을 진단하고 수능 개념, 기출, 실전 순서로 단계를 높여야 합니다. 지역별 수능 과외는 <a href="../csat/">정시 대비 과외</a>에서 안내합니다.</p>`],
      ['검정고시를 준비 중인 재학생이라면', `<p>학교를 다니며 내신 관리와 검정고시 사이에서 고민 중이라면 현재 성적과 목표 대학을 기준으로 판단하는 것이 좋습니다. 재학 중 성적 관리가 필요한 학생은 <a href="../school-record/">내신 대비 과외</a>를 참고하세요.</p>`]
    ],
    faqs: [
      ['검정고시로 4년제 대학에 갈 수 있나요?', '가능합니다. 고졸 검정고시 합격자는 고등학교 졸업자와 같은 학력으로 인정되어 수시와 정시에 지원할 수 있습니다. 다만 전형별 지원 자격은 대학마다 다릅니다.'],
      ['검정고시 출신은 수시와 정시 중 어디가 유리한가요?', '검정고시 고득점자라면 검정고시 성적을 반영하는 수시를, 수능에 강하다면 정시를 노릴 수 있습니다. 목표 대학의 모집 요강을 보고 함께 판단하는 것이 좋습니다.'],
      ['검정고시 후 수능 준비는 언제 시작해야 하나요?', '검정고시 합격 직후부터 바로 시작하는 것이 좋습니다. 고등 과정 기초를 먼저 보완하면 수능 개념 학습이 훨씬 수월해집니다.']
    ]
  }
];

const hub = {
  name: '검정고시 정보',
  title: '검정고시 정보 총정리 | 시험 일정·합격 점수·과목·응시 자격·공부법',
  description: '검정고시 시험 일정, 합격 점수, 고졸·중졸 과목, 응시 자격과 접수 방법, 기출문제 공부법, 검정고시 후 대학 진학까지 한 곳에서 확인하세요.'
};

function escapeAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function shell({ title, description, url, jsonLd, content }) {
  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" /><base href="/info/" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" /><meta property="og:locale" content="ko_KR" /><meta property="og:site_name" content="검정고시" />
    <meta property="og:title" content="${escapeAttribute(title)}" />
    <meta property="og:description" content="${escapeAttribute(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <link rel="icon" type="image/svg+xml" href="../logo.svg" />
    <title>${escapeAttribute(title)}</title>
    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../styles.css" /><link rel="stylesheet" href="../cities/styles.css" />
  </head>
  <body class="city-page">
    <header class="city-topbar"><div class="city-container city-nav"><a class="city-brand" href="../"><span class="city-brand-mark">검</span><span>검정고시</span></a><nav class="city-nav-links" aria-label="검정고시 정보 메뉴"><a href="./">검정고시 정보</a><a href="../cities/">검정고시 과외</a><a href="../school-record/">내신 대비 과외</a><a href="../csat/">정시 대비 과외</a><a class="mobile-menu-cta" href="../#contact">무료 상담</a></nav><a class="city-button primary city-nav-cta" href="../#contact">무료 상담</a><button class="menu-toggle" type="button" aria-label="카테고리 메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button></div></header>
    <main>${content}</main>
    <footer class="city-footer"><div class="city-container city-footer-inner"><p>검정고시 · 검정고시 정보</p><p><a href="./">검정고시 정보</a> · <a href="../cities/">검정고시 과외</a> · 문의 <a href="tel:01029283614">${PHONE}</a></p></div></footer>
    <script src="../mobile-nav.js"></script>
  </body>
</html>
`;
}

function pageUrl(slug) {
  return `${SITE_URL}/info/${slug ? `${slug}/` : ''}`;
}

function breadcrumb(items) {
  return { '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })) };
}

function ctaSection(heading) {
  return `<section class="city-cta"><div class="city-container city-cta-inner"><div><h2>${heading}</h2><p>현재 수준과 남은 기간을 알려주시면 합격까지 필요한 과목과 학습 계획을 안내드립니다.</p></div><div class="city-actions"><a class="city-button primary" href="tel:01029283614">전화 상담 ${PHONE}</a><a class="city-button secondary" href="../cities/">지역별 검정고시 과외</a></div></div></section>`;
}

function renderPage(page) {
  const url = pageUrl(page.slug);
  const others = pages.filter((other) => other !== page);
  const content = `
    <section class="detail-hero"><div class="city-container"><p class="detail-crumb"><a href="../">홈</a> / <a href="./">검정고시 정보</a> / ${page.name}</p><span class="detail-badge">검정고시 정보</span><h1>${page.name}</h1><p>${page.lead}</p></div></section>
    <section class="city-section"><div class="city-container info-article">
      ${page.sections.map(([heading, body]) => `<h2>${heading}</h2>${body}`).join('\n      ')}
      ${NOTICE}
    </div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">FAQ</p><h2>${page.name} 자주 묻는 질문</h2></div></div>
      <div class="local-faq-list">${page.faqs.map(([question, answer]) => `<details class="local-faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div>
    </div></section>
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">MORE GUIDE</p><h2>함께 보면 좋은 검정고시 정보</h2></div></div>
      <div class="neighborhood-grid">${others.map((other) => `<a class="neighborhood-link" href="${other.slug}/"><span>${other.name}</span><span aria-hidden="true">→</span></a>`).join('')}</div>
    </div></section>
    ${ctaSection(`${page.name}, 혼자 확인하기 어렵다면`)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([['홈', `${SITE_URL}/`], [hub.name, pageUrl('')], [page.name, url]]),
      { '@type': 'Article', headline: page.title, description: page.description, url, inLanguage: 'ko-KR', image: OG_IMAGE, author: { '@id': `${SITE_URL}/#organization` }, publisher: { '@id': `${SITE_URL}/#organization` } },
      { '@type': 'FAQPage', mainEntity: page.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }
    ]
  };
  return shell({ title: page.title, description: page.description, url, jsonLd, content });
}

function renderHub() {
  const url = pageUrl('');
  const content = `
    <section class="detail-hero"><div class="city-container"><p class="detail-crumb"><a href="../">홈</a> / 검정고시 정보</p><span class="detail-badge">검정고시 정보 총정리</span><h1>검정고시 준비,<br /><span>필요한 정보만 한 번에</span></h1><p>시험 일정과 합격 점수, 과목, 응시 자격부터 공부법과 대학 진학까지 검정고시를 준비할 때 가장 많이 찾는 정보를 정리했습니다.</p></div></section>
    <section class="city-section"><div class="city-container"><div class="region-grid info-hub-grid">${pages.map((page) => `
      <a class="region-card info-hub-card" href="${page.slug}/"><h3>${page.name}</h3><p>${page.description}</p><span>자세히 보기 →</span></a>`).join('')}
    </div>${NOTICE}</div></section>
    ${ctaSection('검정고시 정보, 우리 아이 상황에 맞춰 상담받으세요')}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([['홈', `${SITE_URL}/`], [hub.name, url]]),
      { '@type': 'CollectionPage', name: hub.title, description: hub.description, url, inLanguage: 'ko-KR', hasPart: pages.map((page) => ({ '@type': 'Article', headline: page.title, url: pageUrl(page.slug) })) }
    ]
  };
  return shell({ title: hub.title, description: hub.description, url, jsonLd, content });
}

const infoDir = path.join(ROOT, 'info');
fs.mkdirSync(infoDir, { recursive: true });
fs.writeFileSync(path.join(infoDir, 'index.html'), renderHub());
for (const page of pages) {
  fs.mkdirSync(path.join(infoDir, page.slug), { recursive: true });
  fs.writeFileSync(path.join(infoDir, page.slug, 'index.html'), renderPage(page));
}

const lastmod = new Date().toISOString().slice(0, 10);
const urls = [pageUrl(''), ...pages.map((page) => pageUrl(page.slug))];
fs.writeFileSync(path.join(ROOT, 'sitemap-info.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);

// RSS feed for Naver Search Advisor (웹 페이지 수집 > RSS 제출).
const feedItems = [
  [hub.title, pageUrl(''), hub.description],
  ...pages.map((page) => [page.title, pageUrl(page.slug), page.description]),
  ['지역별 검정고시 과외 | 전국 시군구·동네 1:1 방문·화상 수업', `${SITE_URL}/cities/`, '전국 시군구·동네별 고졸·중졸 검정고시 1:1 방문·화상 과외 안내'],
  ['내신 과외 | 중고등 국영수 1:1 방문·화상 내신 대비', `${SITE_URL}/school-record/`, '학교별 시험 범위에 맞춘 중학생·고등학생 1:1 내신 과외 안내'],
  ['수능 과외 | 정시 대비 국영수탐 1:1 방문·화상', `${SITE_URL}/csat/`, '고3·재수생·검정고시 출신 수험생을 위한 1:1 수능·정시 대비 과외 안내']
];
const pubDate = new Date().toUTCString();
fs.writeFileSync(path.join(ROOT, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>검정고시 · 검정고시 과외와 시험 정보</title>
    <link>${SITE_URL}/</link>
    <description>검정고시 시험 일정, 합격 점수, 과목 정보와 지역별 검정고시·내신·수능 과외 안내</description>
    <language>ko</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
${feedItems.map(([title, link, description]) => `    <item><title>${escapeAttribute(title)}</title><link>${link}</link><guid>${link}</guid><description>${escapeAttribute(description)}</description><pubDate>${pubDate}</pubDate></item>`).join('\n')}
  </channel>
</rss>
`);
console.log(`info: ${urls.length} pages`);
