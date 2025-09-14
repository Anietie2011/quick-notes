let notes = [];
let editingNoteId = null;
const ddd = document.getElementById("datt");

function toogleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? 'dark' : 'light');
  document.querySelector(".themeToogle").textContent = isDark ? '☀️' : '🌙';
}

function applyStoredTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    document.querySelector(".themeToogle").textContent = localStorage.getItem('theme') === 'dark' ? '☀️' : '🌙';
  }
}

function loadNotes(){
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}


function openModal(noteId = null){
  const titleInput = document.getElementById("title");
  const dialog = document.querySelector(".js-note-dialog");
  const contentInput = document.getElementById("content");
  document.querySelector(".container").style.filter = "blur(2px)";


  if(noteId){
    //edit note
    const noteToEdit = notes.find(note => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById("t").textContent="Edit Note";
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content
  }else{
    //add note
    editingNoteId = null
    document.getElementById("t").textContent = "Add New Note";
    titleInput.value = "";
    contentInput.value = "";
  }
  
  dialog.showModal();
  titleInput.focus();
}
function closeModal() {
  document.querySelector(".js-note-dialog").close();
  document.querySelector(".container").style.filter = "none";
}

function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes))
}
function deleteNote(noteId){
  notes = notes.filter(note => note.id != noteId);
  saveNotes();
  renderNotes();
}
function renderNotes(filteredNotes = notes, isSearch = false) {
  const noteContainer = document.getElementById("noteContainer");

  // Case 1: Searching but no results
  if (isSearch && filteredNotes.length === 0) {
    noteContainer.innerHTML = `
      <div class="no">
        <h2>No Note Found</h2>
        <p>Try a different search term</p>
      </div>
    `;
    return;
  }

  // Case 2: Not searching and no notes exist at all
  if (!isSearch && notes.length === 0) {
    noteContainer.innerHTML = `
      <div class="no">
        <h2>No Note Yet</h2>
        <p>Add your first note to get started</p>
        <button onclick="openModal()">+ Add your first note</button>
      </div>
    `;
    return;
  }

  // Case 3: Show notes (filtered or all)
  noteContainer.innerHTML = filteredNotes.map(note => `
      <div class="notes-holder">
        <span>${note.you}</span>
        <h2 class="title">${note.title}</h2>
        <p class="note-body">${note.content}</p>
        <div class="features">
          <button class="edit" onclick="openModal('${note.id}')" title="Edit Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c9c9c9ff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></button>
          <button class="delete" onclick="deleteNote('${note.id}')" title="Delete Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e367"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
        </div>
      </div>
  `).join('');
}


document.getElementById('search').addEventListener('input', (event) => {
  const term = event.target.value.toLowerCase().trim();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(term) ||
    note.content.toLowerCase().includes(term)
  );

  renderNotes(filtered, true); // true = we are searching
});


function generateId() {
  return Date.now().toString();
}
document.addEventListener("DOMContentLoaded", ()=>{
  notes = loadNotes();
  renderNotes()
  applyStoredTheme();

  document.querySelector(".den").addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const you = ddd.innerHTML = `${day} ${date}<sup>${up}</sup>,${month} ${year}`;

    if(editingNoteId){
      //Update exting nore
      const noteIndex = notes.findIndex(note => note.id === editingNoteId);
      notes[noteIndex] = {
        ...notes[noteIndex],
        title,
        content
      }
    }else{
      //add new note
      notes.unshift({
        id: generateId(),
        you,
        title,
        content
      });
    }
    
    closeModal();
    saveNotes();
    renderNotes();
  });
  document.querySelector(".js-note-dialog").addEventListener('click', function(e){
    if(e.target === this){
      closeModal();
    }
  });
});