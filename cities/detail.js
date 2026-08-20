const params = new URLSearchParams(window.location.search);
const regionName = params.get('region');
const districtName = params.get('district');
const neighborhoodName = params.get('dong');
const region = getRegion(regionName);
const neighborhoods = getNeighborhoods(regionName, districtName);
const apartments = neighborhoodName ? getNeighborhoodApartments(regionName, districtName, neighborhoodName) : [];
const learningKeywords = neighborhoodName ? getNeighborhoodLearningKeywords(regionName, districtName, neighborhoodName) : [];
const neighborhoodKeywords = neighborhoodName ? getNeighborhoodKeywords(regionName, districtName, neighborhoodName) : [];
const detailContent = document.getElementById('detailContent');

function renderNotFound() {
  document.title = '지역 안내를 찾을 수 없습니다 | GED Coach';
  detailContent.innerHTML = `<section class="detail-hero"><div class="city-container"><p class="detail-badge">지역 안내</p><h1>지역 정보를 찾을 수 없습니다.</h1><p>전체 지역 안내에서 원하는 시군구를 다시 선택하거나, 무료 상담으로 문의해주세요.</p><div class="city-actions"><a class="city-button primary" href="./">전체 지역 보기</a><a class="city-button secondary" href="../#contact">무료 상담 신청</a></div></div></section>`;
}

if (!region || !region.districts.includes(districtName) || (neighborhoodName && !neighborhoods.includes(neighborhoodName))) {
  renderNotFound();
} else {
  const title = neighborhoodName ? `${regionName} ${districtName} ${neighborhoodName}` : `${regionName} ${districtName}`;
  const areaLabel = neighborhoodName || districtName;
  document.title = `${title} 검정고시 과외 | GED Coach`;
  document.getElementById('pageDescription').content = `${title} ${neighborhoodKeywords.slice(0, 4).join(', ')}. 국어, 수학, 영어 등 전 과목 방문·화상 수업 상담을 제공합니다.`;
  detailContent.innerHTML = `
    <section class="detail-hero">
      <div class="city-container">
        <p class="detail-crumb"><a href="./">지역별 안내</a> / ${regionName} / <a href="${createDistrictUrl(regionName, districtName)}">${districtName}</a>${neighborhoodName ? ` / ${neighborhoodName}` : ''}</p>
        <span class="detail-badge">${regionName} 지역 맞춤 안내</span>
        <h1><span>${areaLabel}</span> 검정고시<br />맞춤 코칭</h1>
        <p>${title}에서 검정고시를 준비하고 있다면, 현재 학습 수준과 목표 점수에 맞춰 가장 필요한 과목부터 설계해드립니다. 방문 수업과 화상 수업 중 편한 방식으로 상담을 시작하세요.</p>
        <div class="city-actions" style="margin-top: 28px;"><a class="city-button primary" href="../#contact">${areaLabel} 무료 상담 신청</a><a class="city-button secondary" href="tel:01029283614">전화 상담 010-2928-3614</a></div>
        <div class="detail-points"><div class="detail-point"><strong>전 과목 맞춤</strong><span>국어·수학·영어·사회·과학·한국사</span></div><div class="detail-point"><strong>수업 방식 선택</strong><span>방문 수업 · 화상 수업 · 혼합형</span></div><div class="detail-point"><strong>시험 대비 관리</strong><span>기초 진단부터 실전 모의고사까지</span></div></div>
      </div>
    </section>
    ${!neighborhoodName && neighborhoods.length ? `<section class="city-section neighborhood-section"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">LOCAL AREA</p><h2>${districtName} 동별 안내</h2></div><p>거주하는 동을 선택하면 맞춤 상담 페이지로 이동합니다.</p></div><div class="neighborhood-grid">${neighborhoods.map((neighborhood) => `<a class="neighborhood-link" href="${createNeighborhoodUrl(regionName, districtName, neighborhood)}"><span>${neighborhood}</span><span aria-hidden="true">→</span></a>`).join('')}</div></div></section>` : ''}
    ${neighborhoodName ? `<section class="city-section neighborhood-keyword-section"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">NEARBY GED SUPPORT</p><h2>${areaLabel} 아파트·학원가·인근 검정고시 안내</h2></div><p>실제 상담 지역과 가까운 생활권을 기준으로 안내합니다.</p></div><h3 class="keyword-heading">아파트·주요 생활권</h3><div class="apartment-list">${apartments.map((apartment) => `<span class="apartment-tag">${apartment}</span>`).join('')}</div><h3 class="keyword-heading">학원가·교육 키워드</h3><div class="keyword-list">${learningKeywords.map((keyword) => `<a class="keyword-tag" href="${createKakaoMapSearchUrl(keyword)}" target="_blank" rel="noopener">${keyword}</a>`).join('')}</div><h3 class="keyword-heading">검정고시 상담 키워드</h3><div class="keyword-list">${neighborhoodKeywords.map((keyword) => `<span class="keyword-tag">${keyword}</span>`).join('')}</div></div></section>` : ''}
    <section class="city-section"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">LOCALIZED PLAN</p><h2>${areaLabel} 학생에게 필요한 준비</h2></div></div><div class="reason-grid"><article class="reason-card"><span class="reason-number">01</span><h3>현재 수준부터 정확히 진단</h3><p>과목별 이해도와 공부 습관을 확인하고, 단기간에 점수를 만들 수 있는 우선순위를 정합니다.</p></article><article class="reason-card"><span class="reason-number">02</span><h3>검정고시 출제 범위 집중</h3><p>전 범위를 무작정 반복하지 않고, 자주 나오는 핵심 개념과 기출 유형을 중심으로 학습합니다.</p></article><article class="reason-card"><span class="reason-number">03</span><h3>시험 직전까지 피드백</h3><p>주간 학습량과 오답을 점검하며 다음 주 계획을 조정하고, 실전 시간 관리까지 연습합니다.</p></article></div></div></section>
    <section class="city-section alt"><div class="city-container"><div class="city-section-heading"><div><p class="city-kicker">FLEXIBLE LESSON</p><h2>상황에 맞게 수업을 선택하세요</h2></div></div><div class="mode-grid"><article class="mode-card"><h3>방문 수업</h3><p>가능한 일정에 맞춰 선생님이 직접 방문해 집중적인 1:1 코칭을 진행합니다.</p></article><article class="mode-card"><h3>화상 수업</h3><p>거리와 시간 제약 없이 태블릿이나 PC로 수업하고, 학습 자료와 피드백을 바로 공유합니다.</p></article><article class="mode-card"><h3>혼합형 수업</h3><p>평소에는 화상으로 진행하고 시험 직전에는 방문 수업을 더하는 등 유연하게 조합합니다.</p></article></div></div></section>
    <section class="city-cta"><div class="city-container city-cta-inner"><div><h2>${areaLabel} 검정고시, 오늘 진단해보세요.</h2><p>학생의 현재 상황을 알려주시면 가능한 수업 방식과 학습 계획을 안내드립니다.</p></div><div class="city-actions"><a class="city-button primary" href="../#contact">무료 상담 신청</a><a class="city-button secondary" href="${createDistrictUrl(regionName, districtName)}">${districtName} 안내 보기</a></div></div></section>`;
}
