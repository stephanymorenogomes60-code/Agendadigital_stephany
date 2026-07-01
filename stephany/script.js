// Array para armazenar tarefas carregadas do LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Atualiza a tela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    
    // Mantém o tema salvo pelo usuário
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = `${savedTheme}-theme`;
    document.getElementById('theme-select').value = savedTheme;
});

// Alternar Abas (Início, Tarefas, Configuração)
function switchTab(tabId) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desativa todos os botões do menu
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ativa a aba e o botão correspondente
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Adicionar Nova Tarefa
function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText === '') return;
    
    tasks.push(taskText);
    input.value = '';
    
    saveAndRender();
}

// Deletar Tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Salvar no LocalStorage e renderizar lista atualizada
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Atualizar interface das tarefas
function renderTasks() {
    const list = document.getElementById('task-list');
    const countSpan = document.getElementById('task-count');
    
    list.innerHTML = '';
    countSpan.textContent = tasks.length;
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">✔️</button>
        `;
        list.appendChild(li);
    });
}

// Mudar Tema (Claro / Escuro)
function changeTheme() {
    const select = document.getElementById('theme-select');
    const selectedTheme = select.value;
    
    document.body.className = `${selectedTheme}-theme`;
    localStorage.setItem('theme', selectedTheme);
}

