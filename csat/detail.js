const params = new URLSearchParams(window.location.search);
const regionName = params.get('region');
const districtName = params.get('district');
const neighborhoodName = params.get('dong');
const region = getRegion(regionName);
const neighborhoods = getNeighborhoods(regionName, districtName);
const detailContent = document.getElementById('detailContent');

function renderNotFound() {
  document.title = '수능 과외 지역 안내를 찾을 수 없습니다 | 상상코칭 검정고시';
  document.getElementById('pageRobots').content = 'noindex, follow';
  detailContent.innerHTML = `<section class="detail-hero csat-detail-hero"><div class="city-container"><p class="detail-badge">정시 대비 과외</p><h1>지역 정보를 찾을 수 없습니다.</h1><p>전체 지역에서 원하는 시군구를 다시 선택하거나, 무료 상담으로 수능 과외를 문의해주세요.</p><div class="city-actions"><a class="city-button csat-primary" href="./">전체 지역 보기</a><a class="city-button csat-secondary" href="../#contact">무료 상담 신청</a></div></div></section>`;
}

if (!region || !region.districts.includes(districtName) || (neighborhoodName && !neighborhoods.includes(neighborhoodName))) {
  renderNotFound();
} else {
  const title = neighborhoodName ? `${regionName} ${districtName} ${neighborhoodName}` : `${regionName} ${districtName}`;
  const areaLabel = neighborhoodName || districtName;
  const canonicalParams = new URLSearchParams({ region: regionName, district: districtName });
  if (neighborhoodName) canonicalParams.set('dong', neighborhoodName);
  const canonicalUrl = `https://gedcoach.kr/csat/detail.html?${canonicalParams.toString()}`;
  const description = `${title} 검정고시 합격 이후 대학 진학을 위한 수능 과외 및 정시 대비 안내. 국어 영어 수학 탐구의 고등 개념, 기출, 모의고사를 목표 대학에 맞춰 관리합니다.`;
  document.title = `${title} 수능 과외 · 정시 대비 과외 | 상상코칭 검정고시`;
  document.getElementById('pageDescription').content = description;
  document.getElementById('pageCanonical').href = canonicalUrl;
  document.getElementById('pageOgTitle').content = document.title;
  document.getElementById('pageOgDescription').content = description;
  document.getElementById('pageOgUrl').content = canonicalUrl;
  detailContent.innerHTML = `
    <section class="detail-hero csat-detail-hero"><div class="city-container"><p class="detail-crumb"><a href="./">정시 대비 과외</a> / ${regionName} / <a href="${createDistrictUrl(regionName, districtName)}">${districtName}</a>${neighborhoodName ? ` / ${neighborhoodName}` : ''}</p><span class="detail-badge">${title} 수능 과외</span><h1><span>${areaLabel}</span><br />정시 대비 과외</h1><p>${title}에서 검정고시 합격 이후 대학 진학을 준비하거나 수능 성적 향상이 필요한 수험생을 대상으로 1:1 수능 과외를 진행합니다. 검정고시 수준의 교과 기초를 수능 개념과 기출 풀이로 확장하고, 목표 대학의 정시 반영 방식에 맞춰 과목별 학습 순서를 설계합니다.</p><div class="city-actions" style="margin-top: 28px;"><a class="city-button csat-primary" href="../#contact">${areaLabel} 수능 과외 상담</a><a class="city-button csat-secondary" href="tel:01029283614">전화 상담 010-2928-3614</a></div><div class="detail-points"><div class="detail-point"><strong>검정고시 이후</strong><span>고등 기초 점검 · 수능 개념 전환</span></div><div class="detail-point"><strong>수능 실전 대비</strong><span>기출 분석 · 모의고사 · 시간 관리</span></div><div class="detail-point"><strong>정시 지원 설계</strong><span>목표 대학 · 반영 과목 · 목표 등급</span></div></div></div></section>
    <section class="city-section city-guide-section"><div class="city-container"><img class="city-guide-image" src="../[복사본] 과외랜딩페이지.jpg" alt="전 과목 맞춤형 1대1 과외와 내신 및 수능 대비 학습을 안내하는 이미지" loading="lazy" /></div></section>
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">GED TO CSAT</p><h2>검정고시 합격에서 수능 준비로</h2></div><p>합격을 위한 공부와 대학 진학을 위한 수능 공부는 목표와 난도가 다릅니다.</p></div><div class="reason-grid"><article class="reason-card csat-card"><span class="reason-number">01</span><h3>고등 기초의 빈틈 확인</h3><p>검정고시 과목별 성취도와 학습 이력을 확인해 수능 국어, 영어, 수학, 탐구를 시작하기 전에 보완해야 할 고등 개념을 찾습니다.</p></article><article class="reason-card csat-card"><span class="reason-number">02</span><h3>수능형 문제로 단계 전환</h3><p>검정고시의 기본 개념과 문제 풀이에서 출발해 수능의 긴 지문, 복합 개념, 자료 해석과 시간 제한에 차근차근 적응합니다.</p></article><article class="reason-card csat-card"><span class="reason-number">03</span><h3>정시 지원 기준까지 확인</h3><p>희망 대학과 학과별 모집 요강에서 검정고시 출신자의 지원 자격과 수능 반영 과목을 확인하고 필요한 목표 등급을 구체화합니다.</p></article></div><div class="city-actions csat-related-actions"><a class="city-button csat-secondary" href="../cities/">지역별 검정고시 과외 보기</a></div></div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">LOCAL CSAT PLAN</p><h2>${areaLabel} 수험생을 위한 정시 학습 계획</h2></div></div><div class="reason-grid"><article class="reason-card csat-card"><span class="reason-number">01</span><h3>진단 결과로 과목 우선순위 설정</h3><p>기초 진단과 모의고사 결과를 함께 살펴 단기간에 보완할 과목과 꾸준히 누적해야 할 과목을 구분합니다.</p></article><article class="reason-card csat-card"><span class="reason-number">02</span><h3>개념·기출·실전의 주간 계획</h3><p>수능일까지 남은 기간과 공부 가능한 시간을 기준으로 개념 복습, 기출 분석, 실전 모의고사의 비중을 조정합니다.</p></article><article class="reason-card csat-card"><span class="reason-number">03</span><h3>오답과 시간 사용 점검</h3><p>틀린 이유와 풀이 시간을 기록해 반복되는 실수를 줄이고, 매주 성취도에 따라 다음 학습량을 다시 설정합니다.</p></article></div></div></section>
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">SUBJECT FOCUS</p><h2>검정고시 기초를 수능 과목별 실력으로</h2></div></div><div class="mode-grid"><article class="mode-card"><h3>국어 · 영어</h3><p>검정고시에서 익힌 독해와 문법을 바탕으로 수능 지문 구조, 어휘와 구문, 기출 선지 분석, 실전 시간 배분까지 확장합니다.</p></article><article class="mode-card"><h3>수학</h3><p>고등 과정의 개념 누락을 먼저 보완하고 단원별 기출 유형을 연결한 뒤, 목표 등급에 필요한 실전 문제를 훈련합니다.</p></article><article class="mode-card"><h3>사탐 · 과탐</h3><p>희망 대학의 반영 과목과 학습 성향을 고려해 선택 과목을 정하고 핵심 개념, 자료 해석, 문제 적용을 반복합니다.</p></article></div></div></section>
    <section class="city-cta csat-cta"><div class="city-container city-cta-inner"><div><h2>${areaLabel} 수능 과외, 오늘 진단해보세요.</h2><p>학년, 현재 성적, 목표 대학을 알려주시면 정시 대비 학습 방향을 안내드립니다.</p></div><div class="city-actions"><a class="city-button csat-primary" href="../#contact">무료 상담 신청</a><a class="city-button csat-secondary" href="${neighborhoodName ? createDistrictUrl(regionName, districtName) : './'}">${neighborhoodName ? `${districtName} 안내 보기` : '전체 지역 보기'}</a></div></div></section>
    ${!neighborhoodName && neighborhoods.length ? `<section class="city-section neighborhood-section"><div class="city-container"><div class="city-section-heading"><div><p class="csat-kicker">LOCAL AREA</p><h2>${districtName} 동·읍·면별 정시 대비 과외</h2></div><p>거주하는 세부 지역을 선택하면 맞춤 수능 과외 페이지로 이동합니다.</p></div><div class="neighborhood-grid">${neighborhoods.map((neighborhood) => `<a class="neighborhood-link" href="${createNeighborhoodUrl(regionName, districtName, neighborhood)}"><span>${neighborhood} 정시 과외</span><span aria-hidden="true">→</span></a>`).join('')}</div></div></section>` : ''}`;
}
