// Shared SEO sections for the regional detail pages. Used by tools/build-pages.js.
const SITE_URL = 'https://gedcoach.kr';
const CONTACT_PHONE = '010-2928-3614';

const REGION_SHORT_NAMES = {
  서울특별시: '서울', 부산광역시: '부산', 대구광역시: '대구', 인천광역시: '인천', 광주광역시: '광주',
  대전광역시: '대전', 울산광역시: '울산', 세종특별자치시: '세종', 경기도: '경기', 강원특별자치도: '강원',
  충청북도: '충북', 충청남도: '충남', 전북특별자치도: '전북', 전라남도: '전남', 경상북도: '경북',
  경상남도: '경남', 제주특별자치도: '제주'
};

const LOCAL_SERVICES = {
  cities: {
    name: '검정고시 과외',
    hubLabel: '지역별 검정고시 과외',
    kicker: 'city-kicker',
    secondaryButton: 'secondary',
    relatedKeywords: ['검정고시 과외', '고졸 검정고시 과외', '중졸 검정고시 과외', '검정고시 수학 과외', '검정고시 영어 과외', '검정고시 방문 과외', '검정고시 화상 과외', '성인 검정고시 공부'],
    faqs: (area) => [
      [`${area}에서도 방문 검정고시 과외가 가능한가요?`, `${area} 지역은 일정 확인 후 방문 수업을 안내하며, 거리나 시간이 맞지 않으면 같은 커리큘럼의 화상 수업으로 진행할 수 있습니다.`],
      ['고졸·중졸 검정고시 모두 수업하나요?', '중졸·고졸 검정고시 모두 가능합니다. 국어, 수학, 영어, 사회, 과학, 한국사와 선택 과목까지 학생에게 필요한 과목을 골라 준비합니다.'],
      ['검정고시 준비 기간은 얼마나 걸리나요?', '현재 기초 수준과 하루 공부 가능 시간에 따라 다릅니다. 첫 상담에서 과목별 진단을 한 뒤 다음 시험 일정에 맞춘 주간 계획을 안내합니다.'],
      ['과외비는 어떻게 정해지나요?', `수업 과목 수, 주당 수업 횟수, 방문·화상 여부에 따라 달라집니다. 무료 상담(${CONTACT_PHONE})에서 학생 상황을 확인한 뒤 정확히 안내드립니다.`]
    ]
  },
  csat: {
    name: '수능 과외',
    hubLabel: '지역별 정시 대비 과외',
    kicker: 'csat-kicker',
    secondaryButton: 'csat-secondary',
    relatedKeywords: ['수능 과외', '정시 대비 과외', '고3 과외', '재수생 과외', '수능 수학 과외', '수능 국어 과외', '수능 영어 과외', '탐구 과외', '성인 수능 과외', '검정고시 후 수능'],
    faqs: (area) => [
      [`${area}에서 방문 수능 과외를 받을 수 있나요?`, `${area} 지역은 일정 확인 후 방문 수업을 안내하며, 화상 수업이나 방문·화상 혼합형으로도 정시 대비 과외를 진행할 수 있습니다.`],
      ['재수생이나 성인 수험생도 수업할 수 있나요?', '가능합니다. 지난 수능과 모의고사 결과를 분석해 반복된 실수를 줄이고, 공부 가능한 시간에 맞춘 현실적인 정시 계획을 세웁니다.'],
      ['검정고시 출신도 정시로 대학에 지원할 수 있나요?', '대부분의 대학은 고졸 검정고시 합격자의 정시 지원을 허용합니다. 다만 대학·학과별 모집 요강이 다르므로 상담에서 희망 대학의 지원 자격과 반영 과목을 함께 확인합니다.'],
      ['수능 과외비는 어떻게 정해지나요?', `과목 수, 주당 수업 횟수, 방문·화상 여부에 따라 달라집니다. 무료 상담(${CONTACT_PHONE})에서 현재 등급과 목표를 확인한 뒤 안내드립니다.`]
    ]
  },
  'school-record': {
    name: '내신 과외',
    hubLabel: '지역별 내신 대비 과외',
    kicker: 'record-kicker',
    secondaryButton: 'record-secondary',
    relatedKeywords: ['내신 과외', '중학생 과외', '고등학생 과외', '내신 수학 과외', '내신 영어 과외', '내신 국어 과외', '중간고사 대비', '기말고사 대비', '수행평가 관리', '1:1 방문 과외'],
    faqs: (area) => [
      [`${area}에서 방문 내신 과외가 가능한가요?`, `${area} 지역은 일정 확인 후 방문 수업을 안내하며, 시험 기간에는 화상 수업을 더해 수업 횟수를 유연하게 늘릴 수 있습니다.`],
      ['학교별 시험 범위에 맞춰 수업하나요?', '교과서, 부교재, 학교 프린트와 최근 기출 경향을 확인해 학교 시험 범위에 맞춘 개념·서술형·예상 문제를 준비합니다.'],
      ['수학이나 영어 한 과목만 신청할 수 있나요?', '가능합니다. 국어, 영어, 수학, 사회, 과학 중 필요한 과목만 선택할 수 있고, 시험 기간에는 과목 비중을 조정합니다.'],
      ['내신 과외비는 어떻게 정해지나요?', `학년, 과목 수, 주당 수업 횟수, 방문·화상 여부에 따라 달라집니다. 무료 상담(${CONTACT_PHONE})에서 학생 상황을 확인한 뒤 안내드립니다.`]
    ]
  }
};

// Long guide infographics are split into slices so only the first one loads up front.
const GUIDE_IMAGES = {
  'ged-guide': [1415, 1415, 1415, 1415, 1415, 1415, 1410],
  'tutoring-guide': [1463, 1463, 1463, 1463, 1463, 1463, 1463, 1459]
};

function renderGuideImage(key, alt) {
  return GUIDE_IMAGES[key].map((height, index) => `<img class="city-guide-image" src="../images/${key}-${index + 1}.webp" alt="${index === 0 ? alt : ''}" width="900" height="${height}"${index === 0 ? '' : ' loading="lazy"'} decoding="async" />`).join('');
}

function getRegionShortName(regionName) {
  return REGION_SHORT_NAMES[regionName] || regionName;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function createLocalPageUrl(service, regionName, districtName, neighborhoodName) {
  const path = neighborhoodName ? createNeighborhoodUrl(regionName, districtName, neighborhoodName) : createDistrictUrl(regionName, districtName);
  return `${SITE_URL}/${service}/${path}`;
}

function getLocalSearchLabel(regionName, districtName, neighborhoodName) {
  return neighborhoodName ? `${districtName} ${neighborhoodName}` : `${getRegionShortName(regionName)} ${districtName}`;
}

function renderLocalSeo(service, regionName, districtName, neighborhoodName) {
  const config = LOCAL_SERVICES[service];
  const areaLabel = neighborhoodName || districtName;
  const searchLabel = getLocalSearchLabel(regionName, districtName, neighborhoodName);
  const faqs = config.faqs(areaLabel);
  const ownPath = neighborhoodName ? createNeighborhoodUrl(regionName, districtName, neighborhoodName) : createDistrictUrl(regionName, districtName);
  const nearbyAreas = neighborhoodName
    ? getNeighborhoods(regionName, districtName).filter((name) => name !== neighborhoodName).map((name) => [name, createNeighborhoodUrl(regionName, districtName, name)])
    : getRegion(regionName).districts.filter((name) => name !== districtName).map((name) => [name, createDistrictUrl(regionName, name)]);
  const otherServices = Object.entries(LOCAL_SERVICES).filter(([key]) => key !== service);

  const html = `
    <section class="city-section local-seo-section"><div class="city-container">
      <div class="city-section-heading"><div><p class="${config.kicker}">RELATED SEARCH</p><h2>${escapeHtml(searchLabel)} ${config.name} 관련 검색어</h2></div><p>${escapeHtml(areaLabel)}에서 함께 많이 찾는 과외 정보입니다.</p></div>
      <ul class="local-keyword-list">${config.relatedKeywords.map((keyword) => `<li>${escapeHtml(areaLabel)} ${keyword}</li>`).join('')}</ul>
      <h3 class="keyword-heading">${escapeHtml(areaLabel)} 함께 찾는 과외</h3>
      <div class="city-actions local-service-links">${otherServices.map(([key, other]) => `<a class="city-button ${config.secondaryButton}" href="../${key}/${ownPath}">${escapeHtml(areaLabel)} ${other.name}</a>`).join('')}</div>
    </div></section>
    <section class="city-section alt local-faq-section"><div class="city-container">
      <div class="city-section-heading"><div><p class="${config.kicker}">FAQ</p><h2>${escapeHtml(areaLabel)} ${config.name} 자주 묻는 질문</h2></div></div>
      <div class="local-faq-list">${faqs.map(([question, answer]) => `<details class="local-faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div>
    </div></section>
    ${nearbyAreas.length ? `<section class="city-section local-nearby-section"><div class="city-container">
      <div class="city-section-heading"><div><p class="${config.kicker}">NEARBY AREA</p><h2>${escapeHtml(neighborhoodName ? districtName : getRegionShortName(regionName))} 다른 지역 ${config.name}</h2></div></div>
      <div class="neighborhood-grid">${nearbyAreas.map(([name, url]) => `<a class="neighborhood-link" href="${url}"><span>${escapeHtml(name)} ${config.name}</span><span aria-hidden="true">→</span></a>`).join('')}</div>
    </div></section>` : ''}`;

  const pageUrl = createLocalPageUrl(service, regionName, districtName, neighborhoodName);
  const breadcrumbs = [
    ['홈', `${SITE_URL}/`],
    [config.hubLabel, `${SITE_URL}/${service}/`],
    [`${districtName} ${config.name}`, createLocalPageUrl(service, regionName, districtName)]
  ];
  if (neighborhoodName) breadcrumbs.push([`${neighborhoodName} ${config.name}`, pageUrl]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item }))
      },
      {
        '@type': 'Service',
        name: `${searchLabel} ${config.name}`,
        serviceType: config.name,
        url: pageUrl,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Place', name: `${regionName} ${districtName}${neighborhoodName ? ` ${neighborhoodName}` : ''}` }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
      }
    ]
  };

  return { html, jsonLd: JSON.stringify(jsonLd) };
}
