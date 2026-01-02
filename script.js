// Get references to DOM elements
const searchInput = document.querySelector("#search-input");
const addTaskBtn = document.querySelector("#btn-add");
const listContainer = document.querySelector(".list-container");

// Add a new task to the list
const addTask = () => {
    // Get input value and trim whitespace
    const inputValue = searchInput.value.trim();
    // Return early if input is empty
    if (!inputValue) return;

    // Create a new list item element
    let li = document.createElement("li");
    // Add task text and action buttons (edit and delete)
    li.innerHTML = `
            <span>${searchInput.value}</span>
            <div class="btn-group">
                <button class="btn-edit"><i class="ri-edit-2-line"></i></button>
                <button class="btn-delete"><i class="ri-close-large-line"></i></button>
            </div>
        `;
    // Add the new task to the list container
    listContainer.appendChild(li);
    // Clear the input field for the next task
    searchInput.value = "";

    // Save tasks to localStorage
    saveTask();
};

// Add task when "Add" button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed in the input field
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Handle interactions with tasks (edit, delete, toggle completion)
listContainer.addEventListener("click", (e) => {
    // Find the closest button or list item that was clicked
    const editBtn = e.target.closest(".btn-edit");
    const deleteBtn = e.target.closest(".btn-delete");
    const li = e.target.closest("li");

    // Exit if click was not on a list item
    if (!li) return;

    // Handle delete button click
    if (deleteBtn) {
        li.remove();
        saveTask();
        return;
    }

    // Handle edit button click
    if (editBtn) {
        const span = li.querySelector("span");

        // If currently editing, save the changes
        if (li.classList.contains("editing")) {
            const input = li.querySelector("input");
            const newSpan = document.createElement("span");
            newSpan.textContent = input.value.trim();
            input.replaceWith(newSpan);
            li.classList.remove("editing");
            editBtn.innerHTML = `<i class="ri-edit-2-line"></i>`;
        } else {
            // Enter edit mode by replacing span with input field
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;
            span.replaceWith(input);
            li.classList.add("editing");
            editBtn.innerHTML = `<i class="ri-check-line"></i>`;
        }

        saveTask();
        return;
    }

    // Handle task completion toggle when task text is clicked
    if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("checked");
        saveTask();
    }
});

// Save tasks to browser's localStorage
const saveTask = () => {
    localStorage.setItem("tasks", listContainer.innerHTML);
};

// Retrieve tasks from localStorage and display them
const getTask = () => {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
};

// Load tasks when the page first loads
getTask();
