document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('.progress-circle');
  circles.forEach(circle => {
    const progress = circle.getAttribute('data-progress');
    const circumference = 283; // 2 * π * 45
    const offset = circumference * (100 - progress) / 100;
    const progressCircle = circle.querySelector('.circle-progress');
    progressCircle.style.strokeDashoffset = offset;
  });
});
