const container = document.getElementById("issueContainer");
const issueCount = document.getElementById("issueCount");
const loading = document.getElementById("loading");

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

const border =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500";

const card = document.createElement("div");

card.className = `card bg-base-100 shadow ${border}`;

card.innerHTML = `
<div class="card-body">

<h2 class="card-title text-blue-600 cursor-pointer">
${issue.title}
</h2>

<p class="text-sm text-gray-600">
${issue.description}
</p>

<div class="text-sm mt-3 space-y-1">

<p>Status: ${issue.status}</p>
<p>Category: ${issue.category}</p>
<p>Priority: ${issue.priority}</p>
<p>Label: ${issue.label}</p>

</div>

<p class="text-xs text-gray-500 mt-3">
By ${issue.author} • ${issue.createdAt}
</p>

</div>
`;

container.appendChild(card);

});

}

loadIssues();

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

const filtered = allIssues.filter(
issue => issue.status === status
);

displayIssues(filtered);

}

});

});