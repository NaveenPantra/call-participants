const data = [
  {
    name: "Naveen Pantra",
    color: "#f1c40f",
    timeline: ["0-100"],
  },
  {
    name: "Parneeth Reddy Patnam",
    color: "#2ecc71",
    timeline: ["0-80"],
  },
  {
    name: "Yalamanchi Chaitanya Naidu",
    color: "#3498db",
    timeline: ["0-10", "50-90"],
  },
  {
    name: "Rakesh Lankipalli",
    color: "#8e44ad",
    timeline: ["5-30", "40-50", "80-100"],
  },
  {
    name: "Sravan Kumar Viswanadhuni",
    color: "#2c3e50",
    timeline: ["10-50", "70-100"],
  },
  {
    name: "Ravi Teja Modupalli",
    color: "#EA2027",
    timeline: ["30-70"],
  },
  {
    name: "Dharani Kumar Meda",
    color: "#A3CB38",
    timeline: ["25-55", '75-90'],
  },
  {
    name: "Mani Rana Pratap",
    color: "#3c40c6",
    timeline: ["0-60", "62-64", "65-100"],
  },
];

const PARTICIPANTS_DETAILS = document.querySelector(".participants_details");
const PARTICIPANTS_TIMELINE = document.querySelector(".participants_timelines");

function getParticipantDetailsUi(participant, count) {
  return `<div class="participant_detail">
    <p>Caller ${count + 1} ${count === 0 ? '(You)': ''}</p>
    <p class="participant_name" style="color: ${participant.color};">${participant.name}</p>
  </div>`;
}

function getParticipantTimelineUi(participant) {
  
  const timelineUI = participant.timeline.map((time) => {
    const [start, end] = time.split("-");
    return `<div style="left: ${start}%; width: ${end - start}%;background-color: ${participant.color};"></div>`;
  }).join("");

  return `<div class="participant_timeline">
    <div class="timeline_bar">
      ${timelineUI}
    </div>
  </div>`
}

function fillData() {
  data.forEach((participant, index) => {
    const participantDetails = getParticipantDetailsUi(participant, index);
    const participantTimeline = getParticipantTimelineUi(participant);
    PARTICIPANTS_DETAILS.insertAdjacentHTML('beforeend', participantDetails);
    PARTICIPANTS_TIMELINE.insertAdjacentHTML('beforeend', participantTimeline);
  });
}

fillData();
