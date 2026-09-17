const params = new URLSearchParams(window.location.search);
const regionName = params.get('region');
const districtName = params.get('district');
const neighborhoodName = params.get('dong');
const region = getRegion(regionName);
const neighborhoods = getNeighborhoods(regionName, districtName);
const detailContent = document.getElementById('detailContent');

function renderNotFound() {
  document.title = '내신 대비 과외 지역 안내를 찾을 수 없습니다 | 상상코칭';
  document.getElementById('pageRobots').content = 'noindex, follow';
  detailContent.innerHTML = `<section class="detail-hero record-detail-hero"><div class="city-container"><p class="detail-badge">내신 대비 과외</p><h1>지역 정보를 찾을 수 없습니다.</h1><p>전체 지역에서 원하는 시군구를 다시 선택하거나, 무료 상담으로 내신 과외를 문의해주세요.</p><div class="city-actions"><a class="city-button record-primary" href="./">전체 지역 보기</a><a class="city-button record-secondary" href="../#contact">무료 상담 신청</a></div></div></section>`;
}

if (!region || !region.districts.includes(districtName) || (neighborhoodName && !neighborhoods.includes(neighborhoodName))) {
  renderNotFound();
} else {
  const title = neighborhoodName ? `${regionName} ${districtName} ${neighborhoodName}` : `${regionName} ${districtName}`;
  const areaLabel = neighborhoodName || districtName;
  const canonicalParams = new URLSearchParams({ region: regionName, district: districtName });
  if (neighborhoodName) canonicalParams.set('dong', neighborhoodName);
  const canonicalUrl = `https://gedcoach.kr/school-record/detail.html?${canonicalParams.toString()}`;
  const description = `${title} 중학생 고등학생 내신 대비 과외와 검정고시 학습 안내. 국어 영어 수학 사회 과학의 기초부터 학교별 시험 범위, 서술형, 수행평가까지 맞춤 관리합니다.`;
  document.title = `${title} 내신 대비 과외 · 중고등 과외 | 상상코칭`;
  document.getElementById('pageDescription').content = description;
  document.getElementById('pageCanonical').href = canonicalUrl;
  document.getElementById('pageOgTitle').content = document.title;
  document.getElementById('pageOgDescription').content = description;
  document.getElementById('pageOgUrl').content = canonicalUrl;
  detailContent.innerHTML = `
    <section class="detail-hero record-detail-hero"><div class="city-container"><p class="detail-crumb"><a href="./">내신 대비 과외</a> / ${regionName} / <a href="${createDistrictUrl(regionName, districtName)}">${districtName}</a>${neighborhoodName ? ` / ${neighborhoodName}` : ''}</p><span class="detail-badge">${title} 내신 과외</span><h1><span>${areaLabel}</span><br />내신 대비 과외</h1><p>${title} 중학생과 고등학생을 대상으로 학교 진도와 시험 범위, 현재 성적에 맞춘 1:1 내신 과외를 진행합니다. 검정고시 지도 경험을 바탕으로 부족한 교과 기초를 보완하고, 재학생에게 필요한 학교 시험과 수행평가까지 체계적으로 관리합니다.</p><div class="city-actions" style="margin-top: 28px;"><a class="city-button record-primary" href="../#contact">${areaLabel} 내신 과외 상담</a><a class="city-button record-secondary" href="tel:01029283614">전화 상담 010-2928-3614</a></div><div class="detail-points"><div class="detail-point"><strong>내신 전 과목</strong><span>국어 · 영어 · 수학 · 사회 · 과학</span></div><div class="detail-point"><strong>학교별 맞춤</strong><span>교과서 · 부교재 · 학교 프린트</span></div><div class="detail-point"><strong>시험 관리</strong><span>서술형 · 수행평가 · 오답 정리</span></div></div></div></section>
    <section class="city-section city-guide-section"><div class="city-container"><img class="city-guide-image" src="../[복사본] 과외랜딩페이지.jpg" alt="전 과목 맞춤형 1대1 과외와 내신 및 수능 대비 학습을 안내하는 이미지" loading="lazy" /></div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="record-kicker">GED TO SCHOOL RECORD</p><h2>검정고시 학습 경험을 내신 기초로 연결합니다</h2></div><p>배우는 교과의 핵심은 이어지지만 시험의 목적과 준비 방법은 다릅니다.</p></div><div class="reason-grid"><article class="reason-card record-card"><span class="reason-number">01</span><h3>공통 교과 기초부터</h3><p>검정고시와 중·고등 내신 모두 국어, 영어, 수학, 사회, 과학의 기본 개념이 중요합니다. 진단을 통해 이전 학년의 빈틈부터 현재 진도까지 연결합니다.</p></article><article class="reason-card record-card"><span class="reason-number">02</span><h3>평가 방식에 맞게 구분</h3><p>검정고시는 과목별 합격과 고득점을, 내신은 학교별 시험 범위와 서술형·수행평가를 준비합니다. 학생의 현재 과정에 맞춰 교재와 문제 유형을 다르게 구성합니다.</p></article><article class="reason-card record-card"><span class="reason-number">03</span><h3>학업 경로가 달라도 맞춤 관리</h3><p>재학생은 학교 진도와 시험 일정을 중심으로, 학교 밖 학습자는 검정고시 합격 이후 학업 계획까지 고려해 필요한 과목과 학습 순서를 정합니다.</p></article></div><div class="city-actions record-related-actions"><a class="city-button record-secondary" href="../cities/">지역별 검정고시 과외 보기</a></div></div></section>
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="record-kicker">LOCAL SCHOOL PLAN</p><h2>${areaLabel} 학생을 위한 내신 과외</h2></div></div><div class="reason-grid"><article class="reason-card record-card"><span class="reason-number">01</span><h3>현재 성적과 교재 진단</h3><p>최근 시험지와 교과서, 부교재를 확인해 과목별 실수 유형과 가장 먼저 보완할 단원을 정합니다.</p></article><article class="reason-card record-card"><span class="reason-number">02</span><h3>시험일까지 역산한 계획</h3><p>학교 시험 범위와 남은 기간을 기준으로 개념, 유형, 서술형, 실전 문제의 주간 학습량을 구성합니다.</p></article><article class="reason-card record-card"><span class="reason-number">03</span><h3>매주 과제와 오답 관리</h3><p>수업 후 과제 수행과 오답 정리를 점검하고 이해가 부족한 부분은 다음 수업 계획에 바로 반영합니다.</p></article></div></div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="record-kicker">EXAM FOCUS</p><h2>학교 시험에 필요한 준비를 연결합니다</h2></div></div><div class="mode-grid"><article class="mode-card"><h3>국어 · 영어</h3><p>교과서 본문과 학교별 부교재를 중심으로 암기, 문법, 독해, 서술형 답안까지 반복해 준비합니다.</p></article><article class="mode-card"><h3>수학</h3><p>개념과 대표 유형을 정확히 익힌 뒤 학교 프린트, 기출 경향, 고난도 변형 문제로 확장합니다.</p></article><article class="mode-card"><h3>사회 · 과학</h3><p>핵심 개념과 자료 해석을 연결하고 빈칸 점검, 예상 문제, 서술형 표현을 통해 완성도를 높입니다.</p></article></div></div></section>
    <section class="city-cta record-cta"><div class="city-container city-cta-inner"><div><h2>${areaLabel} 내신 과외, 다음 시험부터 달라지게</h2><p>학년, 학교, 최근 성적과 필요한 과목을 알려주시면 내신 대비 방향을 안내드립니다.</p></div><div class="city-actions"><a class="city-button record-primary" href="../#contact">무료 상담 신청</a><a class="city-button record-secondary" href="${neighborhoodName ? createDistrictUrl(regionName, districtName) : './'}">${neighborhoodName ? `${districtName} 안내 보기` : '전체 지역 보기'}</a></div></div></section>
    ${!neighborhoodName && neighborhoods.length ? `<section class="city-section neighborhood-section"><div class="city-container"><div class="city-section-heading"><div><p class="record-kicker">LOCAL AREA</p><h2>${districtName} 동·읍·면별 내신 대비 과외</h2></div><p>거주하는 세부 지역을 선택하면 맞춤 내신 과외 페이지로 이동합니다.</p></div><div class="neighborhood-grid">${neighborhoods.map((neighborhood) => `<a class="neighborhood-link" href="${createNeighborhoodUrl(regionName, districtName, neighborhood)}"><span>${neighborhood} 내신 과외</span><span aria-hidden="true">→</span></a>`).join('')}</div></div></section>` : ''}`;
}