const menuToggle = document.querySelector('.menu-toggle');
const chapterNav = document.querySelector('.chapter-nav');

const updateChrome = () => {
  const isPastOpening = window.scrollY > window.innerHeight * 0.35;
  document.querySelector('.site-header')?.classList.toggle('visible', isPastOpening);
  chapterNav?.classList.toggle('visible', isPastOpening);
};
window.addEventListener('scroll', updateChrome, { passive: true });
updateChrome();

menuToggle?.addEventListener('click', () => {
  const isOpen = chapterNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.chapter-link').forEach((link) => {
  link.addEventListener('click', () => {
    chapterNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const documentChoice = document.querySelector('#document-choice');
const documentChoiceClose = document.querySelector('.document-choice-close');
document.querySelectorAll('.document-choice-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    documentChoice?.showModal();
  });
});
documentChoiceClose?.addEventListener('click', () => documentChoice?.close());
documentChoice?.addEventListener('click', (event) => {
  if (event.target === documentChoice) documentChoice.close();
});

document.querySelectorAll('.experiment-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const experiment = trigger.closest('.experiment');
    const isOpen = experiment.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
});

const visibleSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.chapter-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
visibleSections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal-on-scroll').forEach((element) => revealObserver.observe(element));

const mapThoughts = {
  Curiosity: 'Every experiment is a question wearing a different outfit.',
  Experiments: 'Build the smallest version that can answer the question.',
  Learning: 'The edge of understanding is where the interesting work begins.',
  Failures: 'A broken thing is often more honest than a polished assumption.',
  Ideas: 'Ideas become useful when they meet a stubborn, real problem.',
  Technology: 'Technology is material: shape it around the human need.'
};
const mapOutput = document.querySelector('.map-output');
document.querySelectorAll('.map-node').forEach((node) => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.map-node').forEach((item) => item.classList.remove('selected'));
    node.classList.add('selected');
    mapOutput.textContent = mapThoughts[node.dataset.map];
  });
});

document.querySelectorAll('.proof-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const project = trigger.closest('.proof-project');
    const isOpen = project.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    trigger.querySelector('b').textContent = isOpen ? '↓' : '→';
  });
});

const constellationResponse = document.querySelector('.constellation-response');
document.querySelectorAll('.constellation-node').forEach((node) => {
  node.addEventListener('mouseenter', () => {
    constellationResponse.textContent = node.dataset.response;
  });
  node.addEventListener('mouseleave', () => {
    constellationResponse.textContent = 'Hover over a point of interest.';
  });
  node.addEventListener('focus', () => {
    constellationResponse.textContent = node.dataset.response;
  });
  node.addEventListener('blur', () => {
    constellationResponse.textContent = 'Hover over a point of interest.';
  });
});

const nextQuestion = document.querySelector('.next-question strong');
const nextQuestions = [
  "What's worth building next?",
  "What's still missing?",
  "Can this be simpler?",
  "What happens if I try?"
];
let nextQuestionIndex = 0;
if (nextQuestion) {
  window.setInterval(() => {
    nextQuestionIndex = (nextQuestionIndex + 1) % nextQuestions.length;
    nextQuestion.textContent = nextQuestions[nextQuestionIndex];
  }, 3000);
}

const labObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      labObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.lab-stage div').forEach((stage) => labObserver.observe(stage));

const buildSteps = document.querySelectorAll('.build-step');
const buildStepObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      buildSteps.forEach((step) => step.classList.remove('active'));
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.8 });
buildSteps.forEach((step) => {
  buildStepObserver.observe(step);
  step.addEventListener('mouseenter', () => {
    buildSteps.forEach((item) => item.classList.remove('active'));
    step.classList.add('active');
  });
  step.addEventListener('focus', () => {
    buildSteps.forEach((item) => item.classList.remove('active'));
    step.classList.add('active');
  });
});