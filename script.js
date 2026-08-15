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

  submitButton.textContent = '신청 완료';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.9';

  alert('무료 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
});
