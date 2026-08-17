const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const form = document.getElementById('consultForm');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('.submit-btn');

  submitButton.disabled = true;
  submitButton.textContent = '전송 중...';

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('상담 신청 전송에 실패했습니다.');
      }

      return response.json();
    })
    .then(() => {
      submitButton.textContent = '신청 완료';
      submitButton.style.opacity = '0.9';
      alert('무료 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    })
    .catch(() => {
      submitButton.disabled = false;
      submitButton.textContent = '무료 상담 신청하기';
      alert('전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    });
});
