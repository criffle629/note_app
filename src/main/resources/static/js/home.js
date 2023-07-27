const cookieArr = document.cookie.split('=');
const userId = cookieArr[1];

const submitForm = document.getElementById('note-form');  
const noteContainer = document.getElementById('note-container');


let noteBody = document.getElementById('note-body');
let updateNoteBtn = document.getElementById('update-note-button');

const headers = { 'Content-Type': 'application/json' }

const baseUrl = 'http://127.0.0.1:8080/api/v1/notes';

const handleLogout = () => {
    let c = document.cookie.split(";");
    for (let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const handleSubmut = async (e) => {
    e.preventDefault();

    const bodyObj = { body: document.getElementById('note-input').value }

    await addNote(bodyObj);
    document.getElementById('note-input').value = '';
}

const addNote = async(obj) => {
 
    const res = await fetch(`${baseUrl}/user/${userId}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: headers
    })
    .catch(e => console.error(err.message))

    if (res.status === 200)
        return getNote(userId);
}

const getNote = async(userId) => {
    await fetch(`${baseUrl}/user/${userId}`, {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(data => createNoteCard(data))
    .catch(e => console.error(e.message))
}

const getNoteById = async(noteId) => {
    await fetch(`${baseUrl}/${noteId}`, {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(data => populateModel(data))
    .catch(e => console.error(e.message))
}

const handleNoteEdit = async(noteId) => {
    const bodyObj = {
        id: noteId,
        body: noteBody.value
    }

    await fetch(baseUrl, {
        method: 'PUT',
        body: JSON.stringify(bodyObj),
        headers: headers
    })
    .catch(e => console.error(e.message))

    return getNote(userId);
}

const handleNoteDelete = async(noteId) => {
    await fetch(`${baseUrl}/${noteId}`, {
        method: 'DELETE',
        headers: headers
    })
    .catch(e => console.error(e.message))

    return getNote(userId);
}

const createNoteCard = (array) => {
    noteContainer.innerHTML = '';
    array.forEach(obj => {
        let noteCard = document.createElement("div")
        noteCard.classList.add("m-2")
        noteCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleNoteDelete(${obj.id})">Delete</button>
                        <button onclick="getNoteById(${obj.id})" type="button" class="btn btn-primary" 
                        data-bs-toggle="modal" data-bs-target="#note-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
        `;

        noteContainer.append(noteCard);
    });
}

const populateModel = (obj) => {
    noteBody.innerText = '';
    noteBody.innerText = obj.body;
    updateNoteBtn.setAttribute('data-note-id', obj.id);
 }

getNote(userId);

submitForm.addEventListener('submit', handleSubmut);
updateNoteBtn.addEventListener('click', (e) => {
    const noteId = e.target.getAttribute('data-note-id');
    handleNoteEdit(noteId);
});