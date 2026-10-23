"use strict";
// Public preview only. Do not insert the complete paid manuscript here.
const pages=[
{title:"Welcome to AVi",body:"This is a demonstration of the reading experience. The official extract from the book will appear after editorial approval."},
{title:"A reading experience",body:"Use the arrows to turn pages. You can also adjust the text size using the A− and A+ controls. Keyboard arrow keys work when focus is not inside a control."},
{title:"More to come",body:"The approved preview ends here. Visit the Books page for publication information when available."}
];
let current=0, size=1.2;
const el=id=>document.getElementById(id);
function show(){el("page-title").textContent=pages[current].title;el("page-body").textContent=pages[current].body;el("counter").textContent=(current+1)+" / "+pages.length;el("prev").disabled=current===0;el("next").disabled=current===pages.length-1;}
el("prev").addEventListener("click",()=>{if(current>0){current--;show();}});
el("next").addEventListener("click",()=>{if(current<pages.length-1){current++;show();}});
el("smaller").addEventListener("click",()=>{size=Math.max(0.9,+(size-0.1).toFixed(2));document.documentElement.style.setProperty("--reader-font",size+"rem");});
el("larger").addEventListener("click",()=>{size=Math.min(1.8,+(size+0.1).toFixed(2));document.documentElement.style.setProperty("--reader-font",size+"rem");});
document.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|BUTTON|A|SELECT/.test(document.activeElement?.tagName||""))return;if(e.key==="ArrowRight"&&current<pages.length-1){current++;show();}if(e.key==="ArrowLeft"&&current>0){current--;show();}});
show();