const tarefas = document.querySelectorAll('.week');
const lista = document.querySelectorAll('#lista');
const listaDeTarefas = [];
let indiceApagar = 0;

criarTarefa = (tarefa, indice) => {
    const botaoConfere = document.createElement('span');
    const li = criarLi();
    li.innerHTML += tarefa.value;
    lista[indice].appendChild(li);
    tarefa.value = '';
    criarBotaoConfere(li, botaoConfere, indice);
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li, indice);
    salvarTarefa(li.innerText, indice);

}
const salvarTarefa = (li, indice) => {
    listaDeTarefas.push({ valor: li, id: indice });
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}
const adicionarTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);


    for (let i = 0; i < listaDeTarefas.length; i++) {
        criarTarefasSalvas(listaDeTarefas[i].valor, listaDeTarefas[i].id);
    }
}
const criarTarefasSalvas = (tarefa, indice) => {
    const botaoConfere = document.createElement('span');
    const li = criarLi();
    li.innerHTML += tarefa;
    lista[indice].appendChild(li);
    criarBotaoConfere(li, botaoConfere, indice);
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li, indice);
    salvarTarefa(tarefa, indice);

}
criarBotaoApagarTarefa = (li, indice) => {

    const botaoApagar = document.createElement('span');
    botaoApagar.innerHTML = '<img class="img-apagar" src=".//assets/js/icons8-apagar-para-sempre-24.png" alt=""></img>';
    li.appendChild(botaoApagar);
    botaoApagar.addEventListener('click', () => {

        const tarefas = localStorage.getItem('tarefas');
        const tarefasArray = JSON.parse(tarefas);
        localStorage.removeItem('tarefas');

        let texto = String(botaoApagar.parentElement.innerText);
        tarefasArray.forEach((obj, i) => {
            if (obj.id === indice && obj.valor === texto) {
                indiceApagar = i;
            }
        });
        tarefasArray.splice(indiceApagar, 1);
        listaDeTarefas.splice(indiceApagar, 1);



        botaoApagar.parentElement.remove();
        const tarefasJSON = JSON.stringify(tarefasArray);
        localStorage.setItem('tarefas', tarefasJSON);
    });
}
criarBotaoConfere = (li, botaoConfere, indice) => {
    botaoConfere.innerHTML = '<input class="confere" type="checkbox">';
    const liAntiga = li.innerText;
    botaoConfere.addEventListener('click', () => {
        finalizarTarefa(li, liAntiga, botaoConfere, indice);
    });
}
const finalizarTarefa = (li, liAntiga, botaoConfere, indice) => {
    li.innerHTML = `<s>${liAntiga}</s>`;
    botaoConfere.innerHTML = '<input class="confere" type="checkbox" checked>';
    li.appendChild(botaoConfere);
    criarBotaoApagarTarefa(li, indice);
    reinicializarTarefa(li, liAntiga, botaoConfere, indice);
}
const reinicializarTarefa = (li, liAntiga, botaoConfere, indice) => {
    const botaoConfere2 = document.createElement('span');
    botaoConfere.addEventListener('click', () => {
        li.innerHTML = `${liAntiga}`;
        criarBotaoConfere(li, botaoConfere2);
        li.appendChild(botaoConfere2);
        criarBotaoApagarTarefa(li, indice);
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