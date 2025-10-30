// Data (mark completed courses true)
const courses = [
  { subject:"WDD", number:"WDD 130", title:"Web Fundamentals",            credits:2, completed:true },
  { subject:"WDD", number:"WDD 131", title:"Dynamic Web Fundamentals",    credits:2, completed:true },
  { subject:"WDD", number:"WDD 231", title:"Web Frontend Development I",  credits:2, completed:false }
  // add CSE as needed:
  // { subject:"CSE", number:"CSE 110", title:"Intro to Programming", credits:2, completed:true },
  // { subject:"CSE", number:"CSE 111", title:"Programming w/ Functions", credits:2, completed:true }
];

const listEl  = document.getElementById("courses");
const totalEl = document.getElementById("creditTotal");
const buttons = document.querySelectorAll(".filters button");

function render(list){
  listEl.innerHTML = "";
  list.forEach(c=>{
    const li = document.createElement("li");
    li.textContent = `${c.number}`;
    if (c.completed) li.classList.add("completed");
    listEl.append(li);
  });
  const total = list.reduce((sum,c)=> sum + (Number(c.credits)||0), 0);
  totalEl.textContent = String(total);
}

function filterBy(kind){
  if (kind === "all") return courses;
  return courses.filter(c => c.subject === kind);
}

buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    buttons.forEach(b=>b.setAttribute("aria-pressed","false"));
    btn.setAttribute("aria-pressed","true");
    render(filterBy(btn.dataset.filter));
  });
});

// initial render
render(courses);
