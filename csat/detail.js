const params = new URLSearchParams(window.location.search);
const regionName = params.get('region');
const districtName = params.get('district');
const region = getRegion(regionName);
const detailContent = document.getElementById('detailContent');

function renderNotFound() {
  document.title = '수능 과외 지역 안내를 찾을 수 없습니다 | GED Coach';
  detailContent.innerHTML = `<section class="detail-hero csat-detail-hero"><div class="city-container"><p class="detail-badge">정시 대비 과외</p><h1>지역 정보를 찾을 수 없습니다.</h1><p>전체 지역에서 원하는 시군구를 다시 선택하거나, 무료 상담으로 수능 과외를 문의해주세요.</p><div class="city-actions"><a class="city-button csat-primary" href="./">전체 지역 보기</a><a class="city-button csat-secondary" href="../#contact">무료 상담 신청</a></div></div></section>`;
}

if (!region || !region.districts.includes(districtName)) {
  renderNotFound();
} else {
  const title = `${regionName} ${districtName}`;
  document.title = `${title} 수능 과외 · 정시 대비 과외 | GED Coach`;
  document.getElementById('pageDescription').content = `${title} 국어 영어 수학 사탐 과탐 수능 과외 및 정시 대비 맞춤 학습 안내. 고1, 고2, 고3, 재수생, 성인 수험생 상담을 제공합니다.`;
  detailContent.innerHTML = `
    <section class="detail-hero csat-detail-hero"><div class="city-container"><p class="detail-crumb"><a href="./">정시 대비 과외</a> / ${regionName} / ${districtName}</p><span class="detail-badge">${regionName} ${districtName} 수능 과외</span><h1><span>${districtName}</span><br />정시 대비 과외</h1><p>${title}에서 수능을 준비하는 고1, 고2, 고3, 재수생, 성인 수험생을 대상으로 현재 등급과 목표 대학에 맞춘 1:1 수능 과외를 진행합니다. 방문 수업과 화상 수업 중 상황에 맞는 방식으로 국어 영어 수학 사탐 과탐을 관리합니다.</p><div class="city-actions" style="margin-top: 28px;"><a class="city-button csat-primary" href="../#contact">${districtName} 수능 과외 상담</a><a class="city-button csat-secondary" href="tel:01029283614">전화 상담 010-2928-3614</a></div><div class="detail-points"><div class="detail-point"><strong>수능 전 과목</strong><span>국어 · 영어 · 수학 · 사탐 · 과탐</span></div><div class="detail-point"><strong>대상별 맞춤</strong><span>고1 · 고2 · 고3 · 재수생 · 성인</span></div><div class="detail-point"><strong>정시 전략</strong><span>모의고사 분석 · 목표 대학 · 시간 관리</span></div></div></div></section>
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">LOCAL CSAT PLAN</p><h2>${districtName} 학생을 위한 수능 과외</h2></div></div><div class="reason-grid"><article class="reason-card csat-card"><span class="reason-number">01</span><h3>현재 등급과 약점 진단</h3><p>최근 모의고사와 학습 습관을 확인해 국어 영어 수학 사탐 과탐 중 가장 먼저 올려야 할 과목과 단원을 정합니다.</p></article><article class="reason-card csat-card"><span class="reason-number">02</span><h3>정시 목표에 맞춘 계획</h3><p>희망 대학과 학과의 반영 방식을 기준으로 고등 과정의 개념부터 기출, 실전 문제까지 주간 계획을 구성합니다.</p></article><article class="reason-card csat-card"><span class="reason-number">03</span><h3>매주 오답과 시간 관리</h3><p>수업에서 끝나지 않도록 과제, 오답, 모의고사 시간을 점검하고 다음 학습량을 조정해 꾸준한 성장을 돕습니다.</p></article></div></div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">SUBJECT FOCUS</p><h2>필요한 과목부터 집중합니다</h2></div></div><div class="mode-grid"><article class="mode-card"><h3>국어 · 영어</h3><p>독해 구조, 어휘, 구문, 기출 선지 분석과 실전 시간 배분을 연결해 안정적인 풀이 루틴을 만듭니다.</p></article><article class="mode-card"><h3>수학</h3><p>개념 빈틈을 채우고 유형별 풀이를 정리한 뒤, 목표 등급에 필요한 준킬러와 실전 문제를 훈련합니다.</p></article><article class="mode-card"><h3>사탐 · 과탐</h3><p>선택 과목의 핵심 개념과 자료 해석을 반복하고, 수능 직전까지 암기와 문제 적용을 함께 관리합니다.</p></article></div></div></section>
    <section class="city-cta csat-cta"><div class="city-container city-cta-inner"><div><h2>${districtName} 수능 과외, 오늘 진단해보세요.</h2><p>학년, 현재 성적, 목표 대학을 알려주시면 정시 대비 학습 방향을 안내드립니다.</p></div><div class="city-actions"><a class="city-button csat-primary" href="../#contact">무료 상담 신청</a><a class="city-button csat-secondary" href="./">전체 지역 보기</a></div></div></section>`;
}
