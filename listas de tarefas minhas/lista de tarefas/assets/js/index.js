const tarefas = document.querySelectorAll('.week');
const lista = document.querySelectorAll('#lista');
const indice = [];
criarTarefa = (tarefa, indice) => {
    const botaoConfere = document.createElement('span');
    const li = criarLi();
    li.innerHTML += tarefa.value;
    lista[indice].appendChild(li);
    tarefa.value = '';
    criarBotaoConfere(li, botaoConfere);
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li);
    salvarTarefa();
    salvarIndice(indice);
}
const salvarTarefa = () => {
    const liTarefas = document.querySelectorAll('li');
    const listaDeTarefas = [];


    for (let tarefa of liTarefas) {
        let textoTarefa = tarefa.innerText;
        textoTarefa = String(textoTarefa);
        listaDeTarefas.push(textoTarefa);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}
const salvarIndice = (i) => {
    i = String(i);
    indice.push(i);

    const indiceJSON = JSON.stringify(indice);
    localStorage.setItem('indice', indiceJSON);

}

const adicionarTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas');
    const indice = localStorage.getItem('indice');
    const listaDeTarefas = JSON.parse(tarefas);
    const indiceNumerico = JSON.parse(indice);

    for (let i = 0; i < listaDeTarefas.length; i++) {
        criarTarefasSalvas(listaDeTarefas[i], Number(indiceNumerico[i]));
    }
}
const criarTarefasSalvas = (tarefa, indice) => {
    const botaoConfere = document.createElement('span');
    const li = criarLi();
    li.innerHTML += tarefa;
    lista[indice].appendChild(li);
    criarBotaoConfere(li, botaoConfere);
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li);
    salvarTarefa();
    salvarIndice(indice);
}
criarBotaoApagarTarefa = (li) => {

    const botaoApagar = document.createElement('span');
    botaoApagar.innerHTML = '<img class="img-apagar" src=".//assets/js/icons8-apagar-para-sempre-24.png" alt=""></img>';
    li.appendChild(botaoApagar);
    botaoApagar.addEventListener('click', () => {

        const tarefas = localStorage.getItem('tarefas');
        const indice = localStorage.getItem('indice');
        const indicesNumerico = JSON.parse(indice);
        const listaDeTarefas = JSON.parse(tarefas);
        localStorage.removeItem('indice');
        for (let i in listaDeTarefas) {
            if (listaDeTarefas[i] === li.innerText) {
                let index = indicesNumerico.indexOf(i);
                indicesNumerico.splice(index, 1);
                
                

            }
        }
        const newIndices = JSON.stringify(indicesNumerico);
        localStorage.setItem('indice', newIndices);
        botaoApagar.parentElement.remove();
        salvarTarefa();


    });
}
criarBotaoConfere = (li, botaoConfere) => {
    botaoConfere.innerHTML = '<input class="confere" type="checkbox">';
    const liAntiga = li.innerText;
    botaoConfere.addEventListener('click', () => {
        finalizarTarefa(li, liAntiga, botaoConfere);
    });
}
const finalizarTarefa = (li, liAntiga, botaoConfere) => {
    li.innerHTML = `<s>${liAntiga}</s>`;
    botaoConfere.innerHTML = '<input class="confere" type="checkbox" checked>';
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li);
    reinicializarTarefa(li, liAntiga, botaoConfere);
}
const reinicializarTarefa = (li, liAntiga, botaoConfere) => {
    const botaoConfere2 = document.createElement('span');
    botaoConfere.addEventListener('click', () => {
        li.innerHTML = `${liAntiga}`;
        criarBotaoConfere(li, botaoConfere2);
        li.appendChild(botaoConfere2);
        criarBotaoApagarTarefa(li);
    });
}
const criarLi = () => {
    return document.createElement('li');
}
for (let i = 0; i < tarefas.length; i++) {
    tarefas[i].addEventListener('keyup', e => {
        if (e.keyCode === 13) criarTarefa(tarefas[i], i);


    });
}

adicionarTarefasSalvas();