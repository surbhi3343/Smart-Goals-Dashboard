const Nav = document.getElementById("NavContainer");
const Close = document.getElementById("navCloseIcon");
const bars = document.getElementById("navIcon");
let countClick = 0;
const arr = [
    "Dream big. Start small. Act now.",
    "Discipline is choosing between what you want now and what you want most.",
    "Little by little, a little becomes a lot.",
    "You don't have to be extreme, just consistent."
];
function winload() {
    const box = document.getElementById("Arraybox");
    let num = Math.floor(Math.random() * arr.length);
    box.innerHTML = arr[num];
}
window.onload = winload();
function Switch() {
    countClick++;
    if (countClick === 1) {
        toDark();
    }
    else if (countClick === 2) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        countClick = 0;
    }
}
function toDark() {
    document.body.style.backgroundColor = "rgb(74, 70, 70)";
}
function openNav() {
    Nav.style.display = "block";
    Close.style.display = "inline";
    bars.style.display = "none";
}
function closeNav() {
    Nav.style.display = "none";
    Close.style.display = "none";
    bars.style.display = "inline";
}
function openInput() {
    document.querySelector(".childDiv2").style.display = "block";
    document.getElementById("searchIcon").style.display = "none";
}
function closeChildDiv2() {
    document.querySelector(".childDiv2").style.display = "none";
    document.getElementById("searchIcon").style.display = "inline";
}
function switchtoDark() {
    document.body.style.backgroundColor = "#4a4646";
    document.getElementById("modeIconDark").style.display = "none";
    document.getElementById("modeIconLight").style.display = "inline";
}
function switchtoLight() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.getElementById("modeIconDark").style.display = "inline";
    document.getElementById("modeIconLight").style.display = "none";
}
function formOpen() {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("formContainer").style.display = "flex";
}
function formClose() {
    document.getElementById("mainContent").style.display = "flex";
    document.getElementById("formContainer").style.display = "none";
}
function goalAdded() {
    const checkboxes = document.getElementsByName("categoryName");
    const radioButtons = document.getElementsByName("pgroup");
    let isCheckbox = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isCheckbox = true;
            break;
        }
    }
    if (!isCheckbox) {
        alert("Please select at least one category");
    }
    let isRadio = false;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isRadio = true;
            break;
        }
    }
    if (!isRadio) {
        alert("Please set the priority of the goal");
    }
    if (isRadio && isCheckbox) {
        savetoLocalStorage();
        alert("Goal created Succesfully");
    }
}
function savetoLocalStorage() {
    const checkedvalues = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        checkedvalues.push(checkbox.value);
    });
    const Description = document.getElementById("description").value.trim();
    const CheckedradioValue = document.querySelector('input[name="pgroup"]:checked');
    let radioValue;
    if (CheckedradioValue) {
        radioValue = CheckedradioValue.value;
    }

    const data = {
        Title: document.getElementById("title").value.trim(),
        Category: checkedvalues,
        Deadline: document.getElementById("deadline").value,
        Description: document.getElementById("description").value.trim(),
        Priority: radioValue,
        Status: "Pending",
        CreatedDate: new Date().toISOString()
    };
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    goals.push(data);
    localStorage.setItem("key", JSON.stringify(goals));
    document.getElementById("myForm").reset();
}
function loadfromLocalStorage() {
    const goalContainer = document.getElementById("AllGoals");
    goalContainer.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    goals.forEach((goal, index) => {
        const div = document.createElement("div");
        div.classList.add("cardContainer");
        div.innerHTML = `
        <h3>${goal.Title}</h3>
        <p><strong>Category:</strong>${goal.Category}</p>
                <p><strong>Deadline:</strong>${goal.Deadline}</p>
                <p><strong>Priority:</strong>${goal.Priority}</p>
                <p><strong>Description:</strong>${goal.Description}</p>
                <p><strong>Status:</strong>${goal.Status}</p>
                <div class="TaskAddDeleteBtn">
                <button id="TaskCompleteBtn" onclick="markAsCompleted(${index})">Done</button>
                <button id="TaskDeleteBtn" onclick="Delete(${index})">Delete</button>
                </div>
        `;
        goalContainer.appendChild(div);
    })
}
function markAsCompleted(index) {
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    goals[index].Status = "Completed";
    localStorage.setItem("key", JSON.stringify(goals));
    loadfromLocalStorage();
}
function Delete(index) {
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    goals.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(goals));
    loadfromLocalStorage();
}
window.onload = function () {
    loadfromLocalStorage();
}
function openAllGoals() {
    document.getElementById("AllGoals").style.display = "flex";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("asideContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
    loadfromLocalStorage();
}
function openHome() {
    document.getElementById("mainContent").style.display = "flex";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("asideContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
}
function openCompletedGoals() {
    document.getElementById("CompletedGoals").style.display = "flex";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("asideContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
    const goalContainer = document.getElementById("CompletedGoals");
    goalContainer.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].Status === "Completed") {
            const div = document.createElement("div");
            div.classList.add("cardContainer");
            div.innerHTML = `
        <h3>${goals[i].Title}</h3>
        <p><strong>Category:</strong>${goals[i].Category}</p>
                <p><strong>Deadline:</strong>${goals[i].Deadline}</p>
                <p><strong>Priority:</strong>${goals[i].Priority}</p>
                <p><strong>Description:</strong>${goals[i].Description}</p>
                <p><strong>Status:</strong>${goals[i].Status}</p>
                <div class="TaskAddDeleteBtn">
                <button id="TaskCompleteBtn" onclick="markAsCompleted(${i})">Done</button>
                <button id="TaskDeleteBtn" onclick="Delete(${i})">Delete</button>
                </div>
        `;
            goalContainer.appendChild(div);

        }
    }
}
function openPendingGoals() {
    document.getElementById("PendingGoals").style.display = "flex";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("asideContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
    const goalContainer = document.getElementById("PendingGoals");
    goalContainer.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].Status === "Pending") {
            const div = document.createElement("div");
            div.classList.add("cardContainer");
            div.innerHTML = `
        <h3>${goals[i].Title}</h3>
        <p><strong>Category:</strong>${goals[i].Category}</p>
                <p><strong>Deadline:</strong>${goals[i].Deadline}</p>
                <p><strong>Priority:</strong>${goals[i].Priority}</p>
                <p><strong>Description:</strong>${goals[i].Description}</p>
                <p><strong>Status:</strong>${goals[i].Status}</p>
                <div class="TaskAddDeleteBtn">
                <button id="TaskCompleteBtn" onclick="markAsCompleted(${i})">Done</button>
                <button id="TaskDeleteBtn" onclick="Delete(${i})">Delete</button>
                </div>
        `;
            goalContainer.appendChild(div);

        }
    }
}
function openAsideCards() {
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
    document.getElementById("asideContainer").style.display = "flex";
    const goalContainer = document.getElementById("asideContainer");
    goalContainer.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    goals.forEach((goal, index) => {
        const div1 = document.createElement("div");
        div1.classList.add("flip-card");
        div1.setAttribute("data-category", goal.Category);
        const div2 = document.createElement("div");
        div2.classList.add("flip-card-inner");
        const div3 = document.createElement("div");
        div3.classList.add("flip-card-front");
        div3.innerHTML = `
        <img src="Logo.png" style="width:100%; height:100%;">
        `;
        const div4 = document.createElement("div");
        div4.classList.add("flip-card-back");
        div4.innerHTML = `
        <h3>${goal.Title}</h3>
        <p><strong>Category:</strong>${goal.Category}</p>
                <p><strong>Deadline:</strong>${goal.Deadline}</p>
                <p><strong>Priority:</strong>${goal.Priority}</p>
                <p><strong>Description:</strong>${goal.Description}</p>
                <p><strong>Status:</strong>${goal.Status}</p>
                <div class="TaskAddDeleteBtn">
                <button id="TaskCompleteBtn" onclick="markAsCompleted(${index})">Done</button>
                <button id="TaskDeleteBtn" onclick="Delete(${index})">Delete</button>
                </div>
        `;
        div2.appendChild(div3);
        div2.appendChild(div4);
        div1.appendChild(div2);
        goalContainer.appendChild(div1);

    })
}
function categoryCheck(category) {
    const Category = category;
    const flipCards = document.querySelectorAll(".flip-card");

    flipCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        const inner = card.querySelector(".flip-card-inner");

        if (cardCategory === Category) {
            inner.classList.add("flipped");  // Apply flip
        } else {
            inner.classList.remove("flipped"); // Ensure others are not flipped
        }
    });
}
function sortbyOrder(x) {
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "none";
    document.getElementById("asideContainer").style.display = "flex";
    const goalContainer = document.getElementById("asideContainer");
    goalContainer.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("key")) || [];
    const sortby = x;
    if (sortby === "Alphabetically") {
        goals.sort((a, b) =>
            a.Title.localeCompare(b.Title));
    } else {
        goals.sort((a, b) => {
            const dateA = new Date(a.CreatedDate);
            const dateB = new Date(b.CreatedDate);
            return sortby === "Newest" ? dateB - dateA : dateA - dateB;
        });
    }
    goals.forEach((goal, index) => {
        const div = document.createElement("div");
        div.classList.add("cardContainer");
        div.innerHTML = `
        <h3>${goal.Title}</h3>
        <p><strong>Category:</strong>${goal.Category}</p>
                <p><strong>Deadline:</strong>${goal.Deadline}</p>
                <p><strong>Priority:</strong>${goal.Priority}</p>
                <p><strong>Description:</strong>${goal.Description}</p>
                <p><strong>Status:</strong>${goal.Status}</p>
                <div class="TaskAddDeleteBtn">
                <button id="TaskCompleteBtn" onclick="markAsCompleted(${index})">Done</button>
                <button id="TaskDeleteBtn" onclick="Delete(${index})">Delete</button>
                </div>
        `;
        goalContainer.appendChild(div);
    });
}

let debouncerTimer;
document.getElementById("search").addEventListener("input", function () {
    clearTimeout(debouncerTimer);
    debouncerTimer = setTimeout(() => {
        const searchTerm = this.value.trim().toLowerCase();
        const goals = JSON.parse(localStorage.getItem("key")) || [];
        if (searchTerm === "") {
            renderGoals([]);
            return;
        }
        const filteredGoals = goals.filter(goal =>
            goal.Title.toLowerCase().includes(searchTerm) ||
            goal.Description.toLowerCase().includes(searchTerm)
        );
        if (filteredGoals.length === 0) {
            document.getElementById("searchedContent").innerHTML = `<p>No goals found.</p>`;
        }
        else {
            renderGoals(filteredGoals);
        }
    }, 300);
})
document.getElementById("searchBar").addEventListener("input", function () {

    clearTimeout(debouncerTimer);
    debouncerTimer = setTimeout(() => {
        const searchTerm = this.value.trim().toLowerCase();
        const goals = JSON.parse(localStorage.getItem("key")) || [];
        if (searchTerm === "") {
            renderGoals([]);
            return;
        }
        const filteredGoals = goals.filter(goal =>
            goal.Title.toLowerCase().includes(searchTerm) ||
            goal.Description.toLowerCase().includes(searchTerm)
        );
        if (filteredGoals.length === 0) {
            document.getElementById("searchedContent").innerHTML = `<p>No goals found.</p>`;
        }
        else {
            renderGoals(filteredGoals);
        }
    }, 300);
})
function renderGoals(goals) {
    document.getElementById("PendingGoals").style.display = "none";
    document.getElementById("CompletedGoals").style.display = "none";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("AllGoals").style.display = "none";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("asideContainer").style.display = "none";
    document.getElementById("searchedContent").style.display = "flex";
    const goalContainer = document.getElementById("searchedContent");
    goalContainer.innerHTML = "";
    if (goals.length === 0) {
        return;
    }
    goals.forEach(goal => {
        const div = document.createElement("div");
        div.classList.add("cardContainer");
        div.innerHTML = `
        <h3>${goal.Title}</h3>
        <p><strong>Category:</strong>${goal.Category}</p>
                <p><strong>Deadline:</strong>${goal.Deadline}</p>
                <p><strong>Priority:</strong>${goal.Priority}</p>
                <p><strong>Description:</strong>${goal.Description}</p>
                <p><strong>Status:</strong>${goal.Status}</p>
                </div>
        `;
        goalContainer.appendChild(div);
    })
}
function openModals(id) {
    document.getElementById(id).style.display = "block";
}
function closeModals(id) {
    document.getElementById(id).style.display = "none";
}
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};


