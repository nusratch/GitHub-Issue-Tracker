const container = document.getElementById("issueContainer");
const issueCount = document.getElementById("issueCount");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");

let allIssues = [];


async function loadIssues(){

loading.classList.remove("hidden");

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

loading.classList.add("hidden");

}


function displayIssues(issues){

container.innerHTML = "";

issueCount.innerText = issues.length;

issues.forEach(issue => {

const status = issue.status.toLowerCase();

const border =
status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500";

const priorityColor =
issue.priority === "HIGH"
? "bg-red-100 text-red-600"
: issue.priority === "MEDIUM"
? "bg-yellow-100 text-yellow-700"
: "bg-blue-100 text-blue-600";


const card = document.createElement("div");

card.className = `card bg-base-100 shadow ${border}`;

card.innerHTML = `
<div class="card-body">

<div class="flex justify-between items-start">

<div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
<i class="fa-regular fa-circle text-green-600"></i>
</div>

<span class="px-3 py-1 text-xs rounded-full font-semibold ${priorityColor}">
${issue.priority}
</span>

</div>


<h2 class="card-title text-base font-semibold mt-2 cursor-pointer issue-title">
${issue.title}
</h2>


<p class="text-sm text-gray-500">
${issue.description}
</p>


<div class="flex gap-3 mt-3 text-xs">

<span class="flex items-center gap-1 text-red-500">
<i class="fa-solid fa-bug"></i> BUG
</span>

<span class="flex items-center gap-1 text-yellow-600">
<i class="fa-solid fa-life-ring"></i> HELP WANTED
</span>

</div>


<div class="mt-4 text-xs text-gray-400">

<p>#${issue.id} by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

</div>
`;

card.querySelector(".issue-title").onclick = () => {
loadSingleIssue(issue.id);
};

container.appendChild(card);

});

}


async function loadSingleIssue(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();
const issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDescription").innerText = issue.description;

document.getElementById("modalDetails").innerText =
`Status: ${issue.status}
Category: ${issue.category}
Priority: ${issue.priority}
Author: ${issue.author}
Label: ${issue.label}`;

issueModal.showModal();

}



document.querySelectorAll(".tab-btn").forEach(btn => {

btn.addEventListener("click", () => {

document.querySelectorAll(".tab-btn")
.forEach(b => b.classList.remove("btn-primary"));

btn.classList.add("btn-primary");

const status = btn.dataset.status;

if(status === "all"){
displayIssues(allIssues);
}
else{

const filtered = allIssues.filter(issue =>
issue.status.toLowerCase() === status
);

displayIssues(filtered);

}

});

});



searchInput.addEventListener("input", async (e) => {

const text = e.target.value;

if(text === ""){
displayIssues(allIssues);
return;
}

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();

displayIssues(data.data);

});


loadIssues();