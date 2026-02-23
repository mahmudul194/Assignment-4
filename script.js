const jobsCountEl = document.getElementById('jobs-count');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const statInterviewEl = document.getElementById('stat-interview');
const statRejectedEl = document.getElementById('stat-rejected');

const allListContainer = document.getElementById('all-list');
const emptyStateContainer = document.getElementById('empty-state');

let currentTab = 'all';

function setupTabListeners() {
  for (let i = 0; i < filterButtons.length; i++) {
    let btn = filterButtons[i];
    btn.onclick = handleTabClick;
  }
}

function handleTabClick(e) {
  let btn = e.currentTarget;
  currentTab = btn.dataset.tab;

  for (let i = 0; i < filterButtons.length; i++) {
    let b = filterButtons[i];
    b.className = "filter-btn px-5 py-1.5 rounded text-[13px] font-semibold bg-white text-[#64748b] transition hover:bg-[#f8fafc] border border-transparent hover:border-[#e2e8f0] block";
  }
  btn.className = "filter-btn px-5 py-1.5 rounded text-[13px] font-semibold bg-[#4285F4] text-white transition hover:bg-[#2563eb] block";

  updateUI();
}

function setupJobActionsListener() {
  allListContainer.onclick = handleJobAction;
}

function handleJobAction(e) {
  
  let targetElement = e.target;
  let action = null;
  let id = null;
  let newStatus = null;

  
  while (targetElement !== allListContainer) {
    if (targetElement.tagName === 'BUTTON') {
      action = targetElement.dataset.action;
      id = targetElement.dataset.id;
      newStatus = targetElement.dataset.newstatus;
      break;
    }
    targetElement = targetElement.parentNode;
  }


  if (!action || !id) return;

  if (action === 'delete') {
    const jobCard = document.getElementById(`job-${id}`);
    if (jobCard) {
      jobCard.remove();
      updateUI();
    }
  } else if (action === 'update') {
    updateJobStatus(id, newStatus);
  }
}

function updateJobStatus(id, newStatus) {
  const jobCard = document.getElementById(`job-${id}`);
  if (!jobCard) return;

  jobCard.dataset.status = newStatus;

 
  const badgeContainer = jobCard.querySelector('.badge-container');
  const buttonsContainer = jobCard.querySelector('.buttons-container');
  const title = jobCard.querySelector('.title');

  if (newStatus === 'interview') {
    jobCard.classList.remove('opacity-70');
    title.classList.remove('text-[#64748b]');
    title.classList.add('text-[#1e293b]');
    badgeContainer.innerHTML = '<span class="inline-block bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7] text-[11px] font-bold px-2 py-0.5 rounded mb-3">INTERVIEW</span>';

    buttonsContainer.innerHTML = `
      <button data-action="update" data-id="${id}" data-newstatus="interview" class="px-3 py-1.5 rounded-[4px] text-[11px] font-bold bg-white text-[#3b82f6] border border-[#bfdbfe] hover:bg-[#eff6ff] transition">OFFERED</button>
      <button data-action="update" data-id="${id}" data-newstatus="rejected" class="px-3 py-1.5 rounded-[4px] text-[11px] font-bold bg-white text-[#ef4444] border border-[#fecaca] hover:bg-[#fef2f2] transition">REJECTED</button>
    `;
  } else if (newStatus === 'rejected') {
    jobCard.classList.add('opacity-70');
    title.classList.add('text-[#64748b]');
    title.classList.remove('text-[#1e293b]');
    badgeContainer.innerHTML = '<span class="inline-block bg-[#fef2f2] text-[#ef4444] border border-[#fee2e2] text-[11px] font-bold px-2 py-0.5 rounded mb-3">REJECTED</span>';
    buttonsContainer.innerHTML = '<p class="text-[12px] font-medium text-[#94a3b8]">Application closed</p>';
  }

  updateUI();
}

function updateUI() {
  const allJobsNodeList = document.querySelectorAll('.job-card');
  const allJobs = Array.from(allJobsNodeList);

  const totalCount = allJobs.length;
  const interviewJobs = allJobs.filter(function (job) {
    return job.dataset.status === 'interview';
  });
  const rejectedJobs = allJobs.filter(function (job) {
    return job.dataset.status === 'rejected';
  });

  const interviewCount = interviewJobs.length;
  const rejectedCount = rejectedJobs.length;

  let visibleCount = 0;

  for (let i = 0; i < allJobs.length; i++) {
    let job = allJobs[i];
    const status = job.dataset.status;

   
    if (currentTab === 'all') {
      job.classList.remove('hidden');
      visibleCount++;
    } else if (currentTab === 'interview') {
      if (status === 'interview') {
        job.classList.remove('hidden');
        visibleCount++;
      } else {
        job.classList.add('hidden');
      }
    } else if (currentTab === 'rejected') {
      if (status === 'rejected') {
        job.classList.remove('hidden');
        visibleCount++;
      } else {
        job.classList.add('hidden');
      }
    }
  }

 
  totalCountEl.textContent = totalCount;
  interviewCountEl.textContent = interviewCount;
  rejectedCountEl.textContent = rejectedCount;

  if (visibleCount === 1) {
    jobsCountEl.textContent = visibleCount + ' job';
  } else {
    jobsCountEl.textContent = visibleCount + ' jobs';
  }

 
  if (currentTab === 'interview') {
    statInterviewEl.classList.add('border-l-4', 'border-l-[#14b8a6]');
    statRejectedEl.classList.remove('border-l-4', 'border-l-[#ef4444]');
  } else if (currentTab === 'rejected') {
    statInterviewEl.classList.remove('border-l-4', 'border-l-[#14b8a6]');
    statRejectedEl.classList.add('border-l-4', 'border-l-[#ef4444]');
  } else {
    statInterviewEl.classList.remove('border-l-4', 'border-l-[#14b8a6]');
    statRejectedEl.classList.remove('border-l-4', 'border-l-[#ef4444]');
  }

  
  if (visibleCount === 0) {
    emptyStateContainer.classList.remove('hidden');
  } else {
    emptyStateContainer.classList.add('hidden');
  }
}

setupTabListeners();
setupJobActionsListener();
updateUI();
