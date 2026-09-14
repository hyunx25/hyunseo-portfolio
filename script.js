const careerPages=[
{title:"진로 계획",date:"2026.06",text:"앞으로 배우고 싶은 분야와 진로 방향을 정리한 학습지입니다."},
{title:"관심 직업 탐색",date:"2026.07",text:"관심 있는 직업을 조사하고 필요한 역량을 정리했습니다."},
{title:"관심 학과 조사",date:"2026.08",text:"관심 학과의 교육과정과 진로 방향을 탐색했습니다."}
];
const toc=document.querySelector("#toc"),pages=document.querySelector("#pages"),readerPage=document.querySelector("#readerPage");
function renderCareer(list=careerPages){
 toc.innerHTML=list.map((p,i)=>`<button class="${i===0?"active":""}" data-i="${i}">${String(i+1).padStart(2,"0")}　${p.title}</button>`).join("");
 pages.innerHTML=list.map((p,i)=>`<article class="sheet" id="sheet${i}"><span class="num">${String(i+1).padStart(2,"0")} / ${String(list.length).padStart(2,"0")}</span><small>${p.date} / CAREER LEARNING SHEET</small><h3>${p.title}</h3><div class="rule"></div><p>${p.text}</p><p>학습지를 하나의 PDF로 연결해 기록하는 공간입니다. 실제 작성한 내용과 파일을 넣어 포트폴리오를 계속 업데이트할 수 있습니다.</p></article>`).join("");
 toc.querySelectorAll("button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".toc button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector("#sheet"+b.dataset.i).scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});readerPage.textContent=`${String(+b.dataset.i+1).padStart(2,"0")} / ${String(list.length).padStart(2,"0")}`});
}
renderCareer();
document.querySelector("#pdfSearch").oninput=e=>{const q=e.target.value.trim().toLowerCase();renderCareer(q?careerPages.filter(x=>(x.title+x.text+x.date).toLowerCase().includes(q)):careerPages)};
document.querySelector("#pdfUpload").onchange=e=>{const f=e.target.files[0];if(!f)return;const url=URL.createObjectURL(f);pages.innerHTML=`<iframe src="${url}" title="업로드한 진로 학습지" style="width:100%;height:520px;border:0;background:white"></iframe>`;toc.innerHTML=`<button class="active">PDF / ${f.name}</button>`;document.querySelector("#readerTitle").textContent=f.name;readerPage.textContent="PDF";};

const activityData={
subject:{n:"01",title:"교과 활동",desc:"정보·수학·과학 수업에서 배운 개념을 탐구와 프로젝트에 연결합니다. 수업에서 배운 내용을 직접 코드로 작성하고 실제 문제에 적용해보는 경험을 쌓았습니다.",meta:"LEARNING / INFORMATION / MATH / SCIENCE"},
club:{n:"02",title:"동아리 활동",desc:"동아리에서 아이디어를 나누고 제작 활동을 진행하며 협업과 결과물 개선을 경험합니다. 활동별 과정과 역할을 앞으로 계속 추가합니다.",meta:"TEAMWORK / MAKING / COLLABORATION"},
skill:{n:"03",title:"SKILLS",desc:"현재 사용할 수 있는 기술을 5단계로 기록합니다.",meta:"TECH STACK"}
};
const panel=document.querySelector("#activityPanel");
function showActivity(k){
 const d=activityData[k];
 if(k==="skill"){
  panel.innerHTML=`<div class="activity-content"><div class="num">${d.n}</div><div><h3>${d.title}</h3><p>${d.desc}</p><div class="skill-grid">${[["C","기초 문법·배열","3"],["Arduino","센서·모듈 제어","4"],["HTML/CSS","웹페이지 제작","3"],["JavaScript","기초 기능 구현","2"]].map(x=>`<div class="skill-card"><strong>${x[0]}</strong><span>${x[1]}</span><div class="level">${[1,2,3,4,5].map(n=>`<i class="${n<=+x[2]?"on":""}"></i>`).join("")}</div></div>`).join("")}</div></div></div>`;
 }else panel.innerHTML=`<div class="activity-content"><div class="num">${d.n}</div><div><h3>${d.title}</h3><p>${d.desc}</p><div class="meta">${d.meta}</div></div></div>`;
}
showActivity("subject");
document.querySelectorAll(".filter button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter button").forEach(x=>x.classList.remove("active"));b.classList.add("active");showActivity(b.dataset.tab)});
