const btn = document.getElementById("menu");
const nav = document.getElementById("primary-nav");
if (btn && nav){
  btn.addEventListener("click", ()=>{
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
}
