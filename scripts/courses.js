const courses = [
  {subject:'CSE', number:'CSE 110', title:'Intro to Programming', credits:2, completed:true},
  {subject:'CSE', number:'CSE 111', title:'Programming with Functions', credits:2, completed:true},
  {subject:'CSE', number:'CSE 210', title:'OOP with Classes', credits:2, completed:true},
  {subject:'WDD', number:'WDD 130', title:'Web Fundamentals', credits:2, completed:true},
  {subject:'WDD', number:'WDD 131', title:'Dynamic Web Fundamentals', credits:2, completed:true},
  {subject:'WDD', number:'WDD 231', title:'Web Frontend Development I', credits:2, completed:false}
];

const container = document.getElementById("courses");
const totalOut = document.getElementById("creditTotal");
const buttons = document.querySelectorAll(".filters button");

function display(list) {
  container.innerHTML = "";
  list.forEach(c => {
    const card = document.createElement("div");
    card.className = `course${c.completed ? " completed" : ""}`;
    card.innerHTML = `<h3>${c.number}</h3><p>${c.title}</p><p><strong>${c.credits}</strong> credits</p>`;
    container.append(card);
  });

  const total = list.reduce((sum, c)=> sum + c.credits, 0);
  totalOut.textContent = total;
}

buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    buttons.forEach(b=>b.setAttribute("aria-pressed","false"));
    btn.setAttribute("aria-pressed","true");

    const filter = btn.dataset.filter;
    const filtered = filter === "all" ? courses : courses.filter(c => c.subject === filter);
    display(filtered);
  });
});

display(courses);
