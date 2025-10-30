// scripts/courses.js

// Web & Computer Programming certificate courses
// All completed except WDD 231 (this course)

const courses = [
  { subject: "CSE", number: "CSE 110", title: "Introduction to Programming",        credits: 2, completed: true },
  { subject: "CSE", number: "CSE 111", title: "Programming with Functions",         credits: 2, completed: true },
  { subject: "CSE", number: "CSE 210", title: "Programming with Classes",           credits: 2, completed: true },
  { subject: "WDD", number: "WDD 130", title: "Web Fundamentals",                   credits: 2, completed: true },
  { subject: "WDD", number: "WDD 131", title: "Dynamic Web Fundamentals",           credits: 2, completed: true },
  { subject: "WDD", number: "WDD 231", title: "Web Frontend Development I",         credits: 2, completed: false }
];

// ------- UI wiring -------
const container = document.getElementById('courses');
const totalOut  = document.getElementById('creditTotal');

function render(list) {
  container.innerHTML = '';
  list.forEach(({ number, title, credits, completed }) => {
    const card = document.createElement('article');
    card.className = `course${completed ? ' completed' : ''}`;
    card.innerHTML = `
      <h3>${number}</h3>
      <p>${title}</p>
      <p><strong>${credits}</strong> credits</p>
    `;
    container.append(card);
  });
  const total = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
  totalOut.textContent = total;
}

function filterBy(kind) {
  if (kind === 'WDD') return courses.filter(c => c.subject === 'WDD');
  if (kind === 'CSE') return courses.filter(c => c.subject === 'CSE');
  return courses;
}

render(courses);

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    render(filterBy(btn.dataset.filter));
  });
});
