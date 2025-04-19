//  111selecting element :
const date = document.getElementById('date')
const addBtn = document.getElementById('addBtn')
const input = document.getElementById('inp')
const list = document.querySelector('.list')
const listDesc = document.getElementById('list-desc')
const p = document.getElementById('desc')
const counter = document.getElementById('counter')
const clear = document.getElementById('clear')
const completed = document.querySelector('.completed')


// 222set date :
setInterval(() => {
    const realDate = new Date()
    date.innerText = realDate.toLocaleString()
}, 1000)

let flag = 0

// create Todo :
addBtn.addEventListener('click', () => {
    const inputValue = input.value.trim()
    if (inputValue) {
        let newLi = document.createElement('li')
        newLi.innerHTML = `<input type="checkbox" onclick=checkTodo(this) data-list="list">
                    <input type="text" readonly value="${inputValue}" spellcheck='false' autocomplete='false'>
                    <span onclick=editTodo(this) data-status='off'><i class="bi bi-pencil-square"></i></span>
                    <span onclick=delTodo(this)><i class="bi bi-trash-fill"></i></span>`
        list.appendChild(newLi)
        input.value = null
        input.focus()
        flag++
        counter.textContent = flag
    }
    addContent()
})


//// delete Todo :
function delTodo(s) {
    const liElement = s.parentElement
    const isCompleted = liElement.parentElement.classList.contains('completed')
    liElement.classList.add('del')
    setTimeout(() => {
        liElement.remove()
        if (!isCompleted) {
            flag--
            counter.textContent = flag
        }
        addContent()
    }, 1000)
}


// edit todo :
function editTodo(s) {
    if (s.dataset.status == 'off') {
        s.innerHTML = `<i class="bi bi-check2-square"></i>`
        s.previousElementSibling.removeAttribute('readonly')
        s.previousElementSibling.focus()
        s.dataset.status = 'on'
    } else {
        s.innerHTML = `<i class="bi bi-pencil-square"></i>`
        s.previousElementSibling.setAttribute('readonly', 'readonly')
        s.dataset.status = 'off'
    }
}


// check todo list :
function checkTodo(s) {
    let li = s.parentElement

    if (s.checked) {
        const editButton = li.querySelector('[onclick="editTodo(this)"]');
        editButton.classList.add('hidden');
        completed.classList.remove('hidden')
        completed.appendChild(li)
        s.setAttribute('data-list', 'completed')
        flag--
        counter.textContent = flag
    } else {
        list.appendChild(li)
        const editButton = li.querySelector('[onclick="editTodo(this)"]');
        editButton.classList.remove('hidden');
        s.setAttribute('data-list', 'list')
        if (completed.querySelectorAll('li').length === 0) {
            completed.classList.add('hidden')
        }
        flag++
        counter.textContent = flag
    }
    addContent()
}




// add & remove content :
function addContent() {
    img.classList.add('hidden')
    p.classList.add('hidden')
    listDesc.classList.remove('hidden')
    clear.classList.remove('hidden')

    if (flag < 1) {
        img.classList.remove('hidden')
        p.classList.remove('hidden')
        listDesc.classList.add('hidden')
    }

    if (flag < 1 && completed.querySelectorAll('li').length < 1) {
        completed.classList.add('hidden')
        clear.classList.add('hidden')
    }

    if (completed.querySelectorAll('li').length < 1) {
        completed.classList.add('hidden')
    }
}


// delete all Todo :
clear.addEventListener('click', () => {
    const liElements = list.querySelectorAll("li")
    const liCompleted = completed.querySelectorAll('li')
    for (let i = liElements.length - 1; i >= 0; i--) {
        liElements[i].classList.add('del')
        setTimeout(() => {
            liElements[i].remove()
        }, 1000)
    }
    for (let i = liCompleted.length - 1; i >= 0; i--) {
        liCompleted[i].classList.add('del')
        setTimeout(() => {
            liCompleted[i].remove()
        }, 1000)
    }
    setTimeout(() => {
        flag = 0
        addContent()
        completed.classList.add('hidden')
    }, 1000)
})