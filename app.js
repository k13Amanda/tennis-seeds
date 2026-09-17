// --------------------------------------------------
// CONFIG — DIVISIONS + TEAMS
// --------------------------------------------------
console.log("APP.JS LOADED");



let pendingImportMatches = [];

const divisions = {
  "MS Boys": [
    "Bountiful MS Boys",
    "Farmington MS Boys",
    "Davis MS Boys",
    "Clearfield MS Boys",
    "Weber MS Boys"
  ],
  "MS Girls": [
    "Bountiful MS Girls",
    "Viewmont MS Girls",
    "Farmington MS Girls",
    "Davis MS Girls",
    "Clearfield MS Girls",
    "Weber MS Girls"
  ],
  "Orange Ball": [
    "Bountiful Orange",
    "Farmington Orange",
    "Kaysville Orange",
    "Layton Orange",
    "Clearfield Orange",
    "North Ogden Orange",
    "Pleasant View Orange"
  ],
  "High School": [
    "Farmington/Bountiful HS",
    "Kaysville/Layton HS",
    "Weber HS",
    "Fremont HS",
    "Ridgeline",
    "Cache Valley"
  ]
};

// --------------------------------------------------
// DIVISION FORMATS
// --------------------------------------------------

const divisionFormats = {
  "MS Boys": ["V1S", "V2S", "V1D", "V2D", "V3D", "J1S", "J2S", "J1D", "J2D", "J3D"],
  "MS Girls": ["V1S", "V2S", "V1D", "V2D", "V3D", "J1S", "J2S", "J1D", "J2D", "J3D"],
  "Orange Ball": ["OB1S", "OB2S", "OB1D", "OB2D", "OB3D", "OBJ1D", "OBJ2D", "OBJ3D", "OBJ4D"],
  "High School": [
    "HS1S", "HS2S", "HS3S", "HS4S", "HS5S", "HS6S",
    "HSJ1S", "HSJ2S", "HSJ3S", "HSJ4S", "HSJ5S", "HSJ6S",
    "HS1D", "HS2D", "HS3D",
    "HSJ1D", "HSJ2D", "HSJ3D"
  ]
};

// --------------------------------------------------
// SPOT DEFINITIONS
// --------------------------------------------------

const spotDefinitions = {
  "V1S": { label: "Varsity 1st Singles", level: "varsity", targetGames: 8 },
  "V2S": { label: "Varsity 2nd Singles", level: "varsity", targetGames: 8 },
  "V1D": { label: "Varsity 1st Doubles", level: "varsity", targetGames: 8 },
  "V2D": { label: "Varsity 2nd Doubles", level: "varsity", targetGames: 8 },
  "V3D": { label: "Varsity 3rd Doubles", level: "varsity", targetGames: 8 },

  "J1S": { label: "JV 1st Singles", level: "jv", targetGames: 6 },
  "J2S": { label: "JV 2nd Singles", level: "jv", targetGames: 6 },
  "J1D": { label: "JV 1st Doubles", level: "jv", targetGames: 6 },
  "J2D": { label: "JV 2nd Doubles", level: "jv", targetGames: 6 },
  "J3D": { label: "JV 3rd Doubles", level: "jv", targetGames: 6 },

  "OB1S": { label: "Varsity 1st Singles", level: "varsity", targetGames: 6 },
  "OB2S": { label: "Varsity 2nd Singles", level: "varsity", targetGames: 6 },
  "OB1D": { label: "Varsity 1st Doubles", level: "varsity", targetGames: 6 },
  "OB2D": { label: "Varsity 2nd Doubles", level: "varsity", targetGames: 6 },
  "OB3D": { label: "Varsity 3rd Doubles", level: "varsity", targetGames: 6 },

  "OBJ1D": { label: "JV 1st Doubles", level: "jv", targetGames: 6 },
  "OBJ2D": { label: "JV 2nd Doubles", level: "jv", targetGames: 6 },
  "OBJ3D": { label: "JV 3rd Doubles", level: "jv", targetGames: 6 },
  "OBJ4D": { label: "JV 4th Doubles", level: "jv", targetGames: 6 },

  "HS1S": { label: "Varsity 1st Singles", level: "varsity", targetGames: 8 },
  "HS2S": { label: "Varsity 2nd Singles", level: "varsity", targetGames: 8 },
  "HS3S": { label: "Varsity 3rd Singles", level: "varsity", targetGames: 8 },
  "HS4S": { label: "Varsity 4th Singles", level: "varsity", targetGames: 8 },
  "HS5S": { label: "Varsity 5th Singles", level: "varsity", targetGames: 8 },
  "HS6S": { label: "Varsity 6th Singles", level: "varsity", targetGames: 8 },

  "HSJ1S": { label: "JV 1st Singles", level: "jv", targetGames: 8 },
  "HSJ2S": { label: "JV 2nd Singles", level: "jv", targetGames: 8 },
  "HSJ3S": { label: "JV 3rd Singles", level: "jv", targetGames: 8 },
  "HSJ4S": { label: "JV 4th Singles", level: "jv", targetGames: 8 },
  "HSJ5S": { label: "JV 5th Singles", level: "jv", targetGames: 8 },
  "HSJ6S": { label: "JV 6th Singles", level: "jv", targetGames: 8 },

  "HS1D": { label: "Varsity 1st Doubles", level: "varsity", targetGames: 8 },
  "HS2D": { label: "Varsity 2nd Doubles", level: "varsity", targetGames: 8 },
  "HS3D": { label: "Varsity 3rd Doubles", level: "varsity", targetGames: 8 },

  "HSJ1D": { label: "JV 1st Doubles", level: "jv", targetGames: 8 },
  "HSJ2D": { label: "JV 2nd Doubles", level: "jv", targetGames: 8 },
  "HSJ3D": { label: "JV 3rd Doubles", level: "jv", targetGames: 8 }
};

const STORAGE_KEY = "tennisSeedingMatches";
let currentDivision = "MS Boys";
let matches = [];
let editMode = false;
let editMatchId = null;

// --------------------------------------------------
// INIT
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  setupDivisionButtons();
  loadMatches();
  loadTeamsForDivision(currentDivision);
  renderSpotInputs();
  updateDivisionHeader();
  renderAll();

  document.getElementById("saveMatchBtn").addEventListener("click", () => {
    if (editMode) saveEditedMatch();
    else onSaveMatch();
  });

  document.getElementById("clearAllBtn").addEventListener("click", onClearAll);
});

// --------------------------------------------------
// DIVISION BUTTONS
// --------------------------------------------------

function setupDivisionButtons() {
  const buttons = document.querySelectorAll(".division-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentDivision = btn.dataset.division;

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      loadTeamsForDivision(currentDivision);
      clearSpotInputs();
      renderSpotInputs();
      updateDivisionHeader();
      renderAll();
    });
  });

  document
    .querySelector(`.division-btn[data-division="${currentDivision}"]`)
    .classList.add("active");
}

// --------------------------------------------------
// UPDATE DIVISION HEADER
// --------------------------------------------------

function updateDivisionHeader() {
  const title = document.getElementById("divisionTitle");
  title.textContent = `${currentDivision} Division`;
}

// --------------------------------------------------
// LOAD TEAMS FOR DIVISION
// --------------------------------------------------

function loadTeamsForDivision(division) {
  const teamASelect = document.getElementById("teamASelect");
  const teamBSelect = document.getElementById("teamBSelect");

  teamASelect.innerHTML = "";
  teamBSelect.innerHTML = "";

  divisions[division].forEach(team => {
    const optA = document.createElement("option");
    optA.value = team;
    optA.textContent = team;

    const optB = document.createElement("option");
    optB.value = team;
    optB.textContent = team;

    teamASelect.appendChild(optA);
    teamBSelect.appendChild(optB);
  });

  teamASelect.selectedIndex = 0;
  teamBSelect.selectedIndex = divisions[division].length > 1 ? 1 : 0;
}

// --------------------------------------------------
// RENDER SPOT INPUTS
// --------------------------------------------------

function renderSpotInputs() {
  const varsityContainer = document.getElementById("varsitySpots");
  const jvContainer = document.getElementById("jvSpots");

  varsityContainer.innerHTML = "";
  jvContainer.innerHTML = "";

  const format = divisionFormats[currentDivision];

  format.forEach(spotId => {
    const spot = spotDefinitions[spotId];
    const card = createSpotCard(spotId, spot);

    if (spot.level === "varsity") {
      varsityContainer.appendChild(card);
    } else if (spot.level === "jv") {
      jvContainer.appendChild(card);
    }
  });
}

function createSpotCard(spotId, spot) {
  const card = document.createElement("div");
  card.className = "spot-card";
  card.dataset.spotId = spotId;

  const title = document.createElement("div");
  title.className = "spot-title";
  title.textContent = spot.label;
  card.appendChild(title);

  const scoreRow = document.createElement("div");
  scoreRow.className = "spot-row";

  const labelA = document.createElement("label");
  labelA.textContent = "Team A games";
  const inputA = document.createElement("input");
  inputA.type = "number";
  inputA.min = "0";
  inputA.step = "1";
  inputA.dataset.role = "gamesA";
  labelA.appendChild(inputA);

  const labelB = document.createElement("label");
  labelB.textContent = "Team B games";
  const inputB = document.createElement("input");
  inputB.type = "number";
  inputB.min = "0";
  inputB.step = "1";
  inputB.dataset.role = "gamesB";
  labelB.appendChild(inputB);

  scoreRow.appendChild(labelA);
  scoreRow.appendChild(labelB);
  card.appendChild(scoreRow);

  const cbRow = document.createElement("div");
  cbRow.className = "checkbox-row";

  const dnpLabel = document.createElement("label");
  const dnpCb = document.createElement("input");
  dnpCb.type = "checkbox";
  dnpCb.dataset.role = "dnp";
  dnpLabel.appendChild(dnpCb);
  dnpLabel.appendChild(document.createTextNode("Did Not Play"));

  const defALabel = document.createElement("label");
  const defACb = document.createElement("input");
  defACb.type = "checkbox";
  defACb.dataset.role = "defaultA";
  defALabel.appendChild(defACb);
  defALabel.appendChild(document.createTextNode("Team A defaulted"));

  const defBLabel = document.createElement("label");
  const defBCb = document.createElement("input");
  defBCb.type = "checkbox";
  defBCb.dataset.role = "defaultB";
  defBLabel.appendChild(defBCb);
  defBLabel.appendChild(document.createTextNode("Team B defaulted"));

  defACb.addEventListener("change", () => {
    if (defACb.checked) defBCb.checked = false;
  });
  defBCb.addEventListener("change", () => {
    if (defBCb.checked) defACb.checked = false;
  });

  cbRow.appendChild(dnpLabel);
  cbRow.appendChild(defALabel);
  cbRow.appendChild(defBLabel);

  card.appendChild(cbRow);

  return card;
}

// --------------------------------------------------
// SAVE / EDIT / DELETE MATCHES
// --------------------------------------------------

function onSaveMatch() {
  const date = document.getElementById("matchDate").value || "";
  const teamA = document.getElementById("teamASelect").value;
  const teamB = document.getElementById("teamBSelect").value;

  if (!teamA || !teamB || teamA === teamB) {
    alert("Please choose two different teams.");
    return;
  }

  const matchSpots = {};

  divisionFormats[currentDivision].forEach(spotId => {
    const card = document.querySelector(`.spot-card[data-spot-id="${spotId}"]`);
    const gamesAInput = card.querySelector('input[data-role="gamesA"]');
    const gamesBInput = card.querySelector('input[data-role="gamesB"]');
    const dnpCb = card.querySelector('input[data-role="dnp"]');
    const defACb = card.querySelector('input[data-role="defaultA"]');
    const defBCb = card.querySelector('input[data-role="defaultB"]');

    const dnp = dnpCb.checked;
    const defaultA = defACb.checked;
    const defaultB = defBCb.checked;

    let gamesA = gamesAInput.value ? parseInt(gamesAInput.value, 10) : null;
    let gamesB = gamesBInput.value ? parseInt(gamesBInput.value, 10) : null;

    let result = {
      spotId,
      dnp,
      defaultA,
      defaultB,
      gamesA,
      gamesB,
      winner: null,
      loser: null
    };

    if (dnp) {
      // no result
    } else if (defaultA || defaultB) {
      if (defaultA && defaultB) {
        result.dnp = true;
        result.defaultA = false;
        result.defaultB = false;
      } else if (defaultA) {
        result.winner = teamB;
        result.loser = teamA;
        result.gamesA = 0;
        result.gamesB = 0;
      } else if (defaultB) {
        result.winner = teamA;
        result.loser = teamB;
        result.gamesA = 0;
        result.gamesB = 0;
      }
    } else {
      if (gamesA == null || gamesB == null) {
        result.dnp = true;
      } else {
        if (gamesA > gamesB) {
          result.winner = teamA;
          result.loser = teamB;
        } else if (gamesB > gamesA) {
          result.winner = teamB;
          result.loser = teamA;
        } else {
          result.dnp = true;
        }
      }
    }

    matchSpots[spotId] = result;
  });

  const match = {
    id: Date.now(),
    division: currentDivision,
    date,
    teamA,
    teamB,
    spots: matchSpots
  };

  matches.push(match);
  saveMatches();
  clearSpotInputs();
  renderAll();
}

function clearSpotInputs() {
  document.querySelectorAll(".spot-card").forEach(card => {
    card.querySelectorAll('input[type="number"]').forEach(inp => inp.value = "");
    card.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  });

  document.getElementById("matchDate").value = "";
  editMode = false;
  editMatchId = null;
  document.getElementById("saveMatchBtn").textContent = "Save Entire Match";
}

function onDeleteMatch(matchId) {
  if (!confirm("Delete this match?")) return;
  matches = matches.filter(m => m.id !== matchId);
  saveMatches();
  renderAll();
}

function onEditMatch(matchId) {
  const match = matches.find(m => m.id === matchId);
  if (!match) return;

  editMode = true;
  editMatchId = matchId;

  loadMatchIntoForm(match);

  document.getElementById("saveMatchBtn").textContent = "Save Edited Match";
}



function loadMatchIntoForm(match) {
  document.getElementById("matchDate").value = match.date;
  document.getElementById("teamASelect").value = match.teamA;
  document.getElementById("teamBSelect").value = match.teamB;

  divisionFormats[currentDivision].forEach(spotId => {
    const card = document.querySelector(`.spot-card[data-spot-id="${spotId}"]`);
    const res = match.spots[spotId];

    if (!card || !res) return;

    const gamesAInput = card.querySelector('input[data-role="gamesA"]');
    const gamesBInput = card.querySelector('input[data-role="gamesB"]');
    const dnpCb = card.querySelector('input[data-role="dnp"]');
    const defACb = card.querySelector('input[data-role="defaultA"]');
    const defBCb = card.querySelector('input[data-role="defaultB"]');

    gamesAInput.value = res.gamesA ?? "";
    gamesBInput.value = res.gamesB ?? "";

    dnpCb.checked = res.dnp;
    defACb.checked = res.defaultA;
    defBCb.checked = res.defaultB;
  });
}


function saveEditedMatch() {
  const date = document.getElementById("matchDate").value || "";
  const teamA = document.getElementById("teamASelect").value;
  const teamB = document.getElementById("teamBSelect").value;

  if (!teamA || !teamB || teamA === teamB) {
    alert("Please choose two different teams.");
    return;
  }

  const matchSpots = {};

  divisionFormats[currentDivision].forEach(spotId => {
    const card = document.querySelector(`.spot-card[data-spot-id="${spotId}"]`);
    const gamesAInput = card.querySelector('input[data-role="gamesA"]');
    const gamesBInput = card.querySelector('input[data-role="gamesB"]');
    const dnpCb = card.querySelector('input[data-role="dnp"]');
    const defACb = card.querySelector('input[data-role="defaultA"]');
    const defBCb = card.querySelector('input[data-role="defaultB"]');

    const dnp = dnpCb.checked;
    const defaultA = defACb.checked;
    const defaultB = defBCb.checked;

    let gamesA = gamesAInput.value ? parseInt(gamesAInput.value, 10) : null;
    let gamesB = gamesBInput.value ? parseInt(gamesBInput.value, 10) : null;

    let result = {
      spotId,
      dnp,
      defaultA,
      defaultB,
      gamesA,
      gamesB,
      winner: null,
      loser: null
    };

    if (dnp) {
      // no result
    } else if (defaultA || defaultB) {
      if (defaultA && defaultB) {
        result.dnp = true;
        result.defaultA = false;
        result.defaultB = false;
      } else if (defaultA) {
        result.winner = teamB;
        result.loser = teamA;
        result.gamesA = 0;
        result.gamesB = 0;
      } else if (defaultB) {
        result.winner = teamA;
        result.loser = teamB;
        result.gamesA = 0;
        result.gamesB = 0;
      }
    } else {
      if (gamesA == null || gamesB == null) {
        result.dnp = true;
      } else {
        if (gamesA > gamesB) {
          result.winner = teamA;
          result.loser = teamB;
        } else if (gamesB > gamesA) {
          result.winner = teamB;
          result.loser = teamA;
        } else {
          result.dnp = true;
        }
      }
    }

    matchSpots[spotId] = result;
  });

  const updatedMatch = {
    id: editMatchId,
    division: currentDivision,
    date,
    teamA,
    teamB,
    spots: matchSpots
  };

  const index = matches.findIndex(m => m.id === editMatchId);
  if (index !== -1) {
    matches[index] = updatedMatch;
  }

  saveMatches();
  clearSpotInputs();
  renderAll();
}

// --------------------------------------------------
// MATCHES LIST
// --------------------------------------------------

function renderMatchesList() {
  const container = document.getElementById("matchesList");
  container.innerHTML = "";

  const filtered = matches.filter(m => m.division === currentDivision);

  if (filtered.length === 0) {
    container.textContent = "No matches saved yet for this division.";
    return;
  }

  filtered
    .slice()
    .sort((a, b) => a.id - b.id)
    .forEach(match => {
      const div = document.createElement("div");
      div.className = "match-item";

      const header = document.createElement("div");
      header.className = "match-header";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = `${match.date || "No date"} – ${match.teamA} vs ${match.teamB}`;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", () => onEditMatch(match.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => onDeleteMatch(match.id));

      header.appendChild(titleSpan);
      header.appendChild(editBtn);
      header.appendChild(deleteBtn);

      div.appendChild(header);

      const spotsDiv = document.createElement("div");
      spotsDiv.className = "match-spots";

      divisionFormats[currentDivision].forEach(spotId => {
        const spot = spotDefinitions[spotId];
        const res = match.spots[spotId];
        if (!res) return;

        const line = document.createElement("div");
        line.className = "match-spot-line";

        if (res.dnp) {
          line.textContent = `${spot.label}: Did Not Play`;
        } else if (res.defaultA) {
          line.textContent = `${spot.label}: Team A defaulted → ${match.teamB} win`;
        } else if (res.defaultB) {
          line.textContent = `${spot.label}: Team B defaulted → ${match.teamA} win`;
        } else if (res.winner) {
          line.textContent = `${spot.label}: ${res.gamesA}-${res.gamesB} → ${res.winner} win`;
        } else {
          line.textContent = `${spot.label}: No result`;
        }

        spotsDiv.appendChild(line);
      });

      div.appendChild(spotsDiv);
      container.appendChild(div);
    });
}

// --------------------------------------------------
// STORAGE
// --------------------------------------------------

function saveMatches() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
}

function loadMatches() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    matches = [];
    return;
  }
  try {
    matches = JSON.parse(raw) || [];
  } catch {
    matches = [];
  }
}

function onClearAll() {
  if (!confirm("Clear ALL saved matches for ALL divisions?")) return;
  matches = [];
  saveMatches();
  clearSpotInputs();
  renderAll();
}

// --------------------------------------------------
// STANDINGS + SEEDS
// --------------------------------------------------

function computeStandingsBySpot() {
  const standingsBySpot = {};

  divisionFormats[currentDivision].forEach(spotId => {
    const spot = spotDefinitions[spotId];
    const table = {};

    divisions[currentDivision].forEach(team => {
      table[team] = {
        team,
        wins: 0,
        losses: 0,
        gamesWon: 0,
        gamesLost: 0,
        headToHead: {}
      };
    });

    const filteredMatches = matches.filter(m => m.division === currentDivision);

    filteredMatches.forEach(match => {
      const res = match.spots[spotId];
      if (!res || res.dnp) return;

      const teamA = match.teamA;
      const teamB = match.teamB;

      const entryA = table[teamA];
      const entryB = table[teamB];
      if (!entryA || !entryB) return;

      const gamesA = res.gamesA || 0;
      const gamesB = res.gamesB || 0;

      entryA.gamesWon += gamesA;
      entryA.gamesLost += gamesB;
      entryB.gamesWon += gamesB;
      entryB.gamesLost += gamesA;

      if (res.winner === teamA) {
        entryA.wins += 1;
        entryB.losses += 1;
        updateHeadToHead(entryA, entryB.team, true);
        updateHeadToHead(entryB, entryA.team, false);
      } else if (res.winner === teamB) {
        entryB.wins += 1;
        entryA.losses += 1;
        updateHeadToHead(entryB, entryA.team, true);
        updateHeadToHead(entryA, entryB.team, false);
      }
    });

    standingsBySpot[spotId] = { spot, table };
  });

  return standingsBySpot;
}

function updateHeadToHead(entry, opponent, win) {
  if (!entry.headToHead[opponent]) {
    entry.headToHead[opponent] = { wins: 0, losses: 0 };
  }
  if (win) {
    entry.headToHead[opponent].wins += 1;
  } else {
    entry.headToHead[opponent].losses += 1;
  }
}

function renderSeeds(standingsBySpot) {
  const varsityContainer = document.getElementById("varsitySeeds");
  const jvContainer = document.getElementById("jvSeeds");

  varsityContainer.innerHTML = "";
  jvContainer.innerHTML = "";

  divisionFormats[currentDivision].forEach(spotId => {
    const data = standingsBySpot[spotId];
    if (!data) return;

    const spot = data.spot;
    const table = data.table;
    const teamsArray = Object.values(table);

    const activeTeams = teamsArray.filter(t => t.wins > 0 || t.losses > 0);
    if (activeTeams.length === 0) return;

    activeTeams.forEach(t => {
      t.winPct = t.wins + t.losses > 0 ? t.wins / (t.wins + t.losses) : 0;
      t.gameDiff = t.gamesWon - t.gamesLost;
    });

    const sorted = activeTeams.slice().sort((a, b) => compareTeamsWithTiebreaks(a, b));

    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";

    const title = document.createElement("div");
    title.textContent = spot.label;
    title.style.fontWeight = "600";
    title.style.marginTop = "0.5rem";
    wrapper.appendChild(title);

    const tbl = document.createElement("table");
    const thead = document.createElement("thead");
    const trh = document.createElement("tr");

    ["Seed", "Team", "Wins", "Losses", "Win %", "Game Diff", "Games Won"].forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      trh.appendChild(th);
    });

    thead.appendChild(trh);
    tbl.appendChild(thead);

    const tbody = document.createElement("tbody");

    sorted.forEach((t, idx) => {
      const tr = document.createElement("tr");

      const seedCell = document.createElement("td");
      seedCell.textContent = idx + 1;
      tr.appendChild(seedCell);

      const teamCell = document.createElement("td");
      teamCell.textContent = t.team;
      tr.appendChild(teamCell);

      const winsCell = document.createElement("td");
      winsCell.textContent = t.wins;
      tr.appendChild(winsCell);

      const lossesCell = document.createElement("td");
      lossesCell.textContent = t.losses;
      tr.appendChild(lossesCell);

      const pctCell = document.createElement("td");
      pctCell.textContent = (t.winPct * 100).toFixed(1) + "%";
      tr.appendChild(pctCell);

      const diffCell = document.createElement("td");
      diffCell.textContent = t.gameDiff;
      tr.appendChild(diffCell);

      const gwCell = document.createElement("td");
      gwCell.textContent = t.gamesWon;
      tr.appendChild(gwCell);

      tbody.appendChild(tr);
    });

    tbl.appendChild(tbody);
    wrapper.appendChild(tbl);

    const tieNote = detectTrueTies(sorted);
    if (tieNote) {
      const noteDiv = document.createElement("div");
      noteDiv.className = "tie-note";
      noteDiv.textContent = tieNote;
      wrapper.appendChild(noteDiv);
    }

    if (spot.level === "varsity") {
      varsityContainer.appendChild(wrapper);
    } else if (spot.level === "jv") {
      jvContainer.appendChild(wrapper);
    }
  });
}

function compareTeamsWithTiebreaks(a, b) {
  if (b.winPct !== a.winPct) return b.winPct - a.winPct;

  const h2hA = a.headToHead[b.team] || { wins: 0, losses: 0 };
  const h2hB = b.headToHead[a.team] || { wins: 0, losses: 0 };

  const aH2HNet = h2hA.wins - h2hA.losses;
  const bH2HNet = h2hB.wins - h2hB.losses;

  if (aH2HNet !== bH2HNet) return bH2HNet - aH2HNet;

  if (b.gameDiff !== a.gameDiff) return b.gameDiff - a.gameDiff;

  if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;

  return 0;
}

function detectTrueTies(sorted) {
  if (sorted.length < 2) return "";

  const ties = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];

    const sameWinPct = a.winPct === b.winPct;

    const h2hA = a.headToHead[b.team] || { wins: 0, losses: 0 };
    const h2hB = b.headToHead[a.team] || { wins: 0, losses: 0 };

    const sameH2H = (h2hA.wins - h2hA.losses) === (h2hB.wins - h2hB.losses);
    const sameGameDiff = a.gameDiff === b.gameDiff;
    const sameGamesWon = a.gamesWon === b.gamesWon;

    if (sameWinPct && sameH2H && sameGameDiff && sameGamesWon) {
      ties.push([a.team, b.team]);
    }
  }

  if (ties.length === 0) return "";

  const uniqueTeams = new Set();
  ties.forEach(pair => pair.forEach(t => uniqueTeams.add(t)));

  const list = Array.from(uniqueTeams).join(", ");
  return `True tie between: ${list}. All tiebreakers exhausted.`;
}

// --------------------------------------------------
// RENDER EVERYTHING
// --------------------------------------------------

function renderAll() {
  renderMatchesList();
  const standingsBySpot = computeStandingsBySpot();
  renderSeeds(standingsBySpot);
}


// ======================================================
// ===== EXCEL IMPORT + PREVIEW WINDOW SECTION =====
// ======================================================

// ------------------------------
// Excel Upload Handler
// ------------------------------
document.getElementById("importExcelBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("excelUpload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an Excel file first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array", cellDates: true });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    importLeagueSheet(json);
  };

  reader.readAsArrayBuffer(file);
});


// ------------------------------
// League Importer (Builds Preview List)
// ------------------------------
function importLeagueSheet(rawGrid) {
  console.log("RAW GRID:", rawGrid);

  // Drop fully-blank rows (common when Excel formatting extends past the real data)
  const grid = rawGrid.filter(row =>
    row && row.some(cell => cell !== undefined && String(cell).trim() !== "")
  );

  console.log("CLEANED GRID:", grid);

  pendingImportMatches = [];

  if (grid.length < 3) {
    alert("Couldn't find enough rows in the sheet — need at least a date row, one spot row, and a team row.");
    return;
  }

  const datesRow = grid[0];
  const teamARow = grid[1];
  const teamBRow = grid[grid.length - 1];
  const spotRows = grid.slice(2, grid.length - 1);

  for (let col = 1; col < datesRow.length; col++) {
    const date = formatImportedDate(datesRow[col]);
    const teamA = teamARow[col];
    const teamB = teamBRow[col];

    if (!date || !teamA || !teamB) continue;

    for (let r = 0; r < spotRows.length; r++) {
      const row = spotRows[r];
      const spotName = row[0];
      const score = row[col];

      if (!spotName) continue;

      const spotID = mapSpotNameToID(spotName);
      if (!spotID) continue;

      // Handle DNP
      if (String(score).trim().toUpperCase() === "DNP") {
        pendingImportMatches.push({
          date,
          teamA,
          teamB,
          spotID,
          dnp: true,
          defaultA: false,
          defaultB: false,
          scoreA: null,
          scoreB: null,
          rawScore: "DNP"
        });
        continue;
      }

      // Handle defaults
      const lower = String(score).toLowerCase();
      if (lower.includes("default")) {
        const defaultA = lower.includes("default a");
        const defaultB = lower.includes("default b");

        pendingImportMatches.push({
          date,
          teamA,
          teamB,
          spotID,
          dnp: false,
          defaultA,
          defaultB,
          scoreA: 0,
          scoreB: 0,
          rawScore: score
        });
        continue;
      }

      // Normal score
      const parsed = parseScore(score);
      if (!parsed) continue;

      pendingImportMatches.push({
        date,
        teamA,
        teamB,
        spotID,
        dnp: false,
        defaultA: false,
        defaultB: false,
        scoreA: parsed.a,
        scoreB: parsed.b,
        rawScore: score
      });
    }
  }

  showPreview();
}


// ------------------------------
// Preview Window Renderer
// ------------------------------
function showPreview() {
  const previewDiv = document.getElementById("importPreview");
  const content = document.getElementById("previewContent");

  previewDiv.style.display = "block";
  content.innerHTML = "";

  if (pendingImportMatches.length === 0) {
    content.innerHTML = "<p style='color:red;'>No matches detected.</p>";
    return;
  }

  let currentMatchKey = "";

  pendingImportMatches.forEach(m => {
    const matchKey = `${m.date} — ${m.teamA} vs ${m.teamB}`;

    if (matchKey !== currentMatchKey) {
      currentMatchKey = matchKey;
      content.innerHTML += `<h3>${matchKey}</h3>`;
    }

    if (m.dnp) {
      content.innerHTML += `${m.spotID}: DNP<br>`;
    } else if (m.defaultA) {
      content.innerHTML += `${m.spotID}: Team A Defaulted<br>`;
    } else if (m.defaultB) {
      content.innerHTML += `${m.spotID}: Team B Defaulted<br>`;
    } else {
      content.innerHTML += `${m.spotID}: ${m.scoreA}-${m.scoreB}<br>`;
    }
  });
}



// ------------------------------
// Confirm / Cancel Import
// ------------------------------
document.getElementById("confirmImportBtn").addEventListener("click", () => {
  saveImportedMatches(pendingImportMatches);
  alert("Import complete!");
  document.getElementById("importPreview").style.display = "none";
  renderAll(); // refresh standings + list
});

document.getElementById("cancelImportBtn").addEventListener("click", () => {
  pendingImportMatches = [];
  document.getElementById("importPreview").style.display = "none";
});


// ------------------------------
// Spot Name → Spot ID Mapper
// ------------------------------
function mapSpotNameToID(name) {
  const map = {
    "Varsity 1st Singles": "V1S",
    "Varsity 2nd Singles": "V2S",
    "Varsity 1st Doubles": "V1D",
    "Varsity 2nd Doubles": "V2D",
    "Varsity 3rd Doubles": "V3D",
    "JV 1st Singles": "J1S",
    "JV 2nd Singles": "J2S",
    "JV 1st Doubles": "J1D",
    "JV 2nd Doubles": "J2D",
    "JV 3rd Doubles": "J3D"
  };

  return map[name] || null;
}


// ------------------------------
// Score Parser (A-B format)
// ------------------------------
function parseScore(score) {
  const parts = String(score).split("-");
  if (parts.length !== 2) return null;

  const a = parseInt(parts[0].trim(), 10);
  const b = parseInt(parts[1].trim(), 10);

  if (Number.isNaN(a) || Number.isNaN(b)) return null;

  return { a, b };
}


// added this function here

function formatImportedDate(value) {
  if (value instanceof Date && !isNaN(value)) {
    const mm = String(value.getMonth() + 1).padStart(2, "0");
    const dd = String(value.getDate()).padStart(2, "0");
    const yyyy = value.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  return value; // fallback: leave as-is if it wasn't parsed as a Date
}

// ------------------------------
// Save Imported Match
// ------------------------------

function saveImportedMatches(importList) {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const grouped = {};

  importList.forEach(m => {
    const key = `${m.date}__${m.teamA}__${m.teamB}`;

    if (!grouped[key]) {
      grouped[key] = {
        id: Date.now() + Math.random(),
        division: currentDivision,
        date: m.date,
        teamA: m.teamA,
        teamB: m.teamB,
        spots: {}
      };
    }

    const result = {
      spotId: m.spotID,
      dnp: m.dnp,
      defaultA: m.defaultA,
      defaultB: m.defaultB,
      gamesA: m.dnp ? null : m.scoreA,
      gamesB: m.dnp ? null : m.scoreB,
      winner: null,
      loser: null
    };

    if (m.dnp) {
      // no winner or loser
    } else if (m.defaultA) {
      result.winner = m.teamB;
      result.loser = m.teamA;
    } else if (m.defaultB) {
      result.winner = m.teamA;
      result.loser = m.teamB;
    } else {
      result.winner = m.scoreA > m.scoreB ? m.teamA : m.teamB;
      result.loser = m.scoreA > m.scoreB ? m.teamB : m.teamA;
    }

    grouped[key].spots[m.spotID] = result;
  });

  Object.values(grouped).forEach(match => stored.push(match));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  matches = stored;
}
