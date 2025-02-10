if (!localStorage.getItem('Lines')) {
    fetch('back/dados.json') // Caminho para o arquivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            console.log('Dados carregados com sucesso:', data);
            // Aqui você pode manipular os dados como quiser
            // Por exemplo, armazenar no localStorage ou atualizar a interface
            localStorage.setItem('Lines', JSON.stringify(data));
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}
if (!localStorage.getItem('Quedas')) {
    fetch('back/quedas.json') // Caminho para o arquivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            console.log('Dados carregados com sucesso:', data);
            // Aqui você pode manipular os dados como quiser
            // Por exemplo, armazenar no localStorage ou atualizar a interface
            localStorage.setItem('Quedas', JSON.stringify(data));
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}
if (!localStorage.getItem('newID')) {
    localStorage.setItem('newID', 'Line_01')
}
if (!localStorage.getItem('oldID')) {
    localStorage.setItem('oldID', '')
}
let [newID, oldID] = [localStorage.getItem('newID'), localStorage.getItem('oldID')];
let Lines = JSON.parse(localStorage.getItem('Lines'));
let Quedas = localStorage.getItem('Quedas');

document.addEventListener('DOMContentLoaded', () => {

    localStorage.clear();

    Lines.sort((a, b) => {
        let vl1 = parseInt(a.LineID.replace('Line_', ''));
        let vl2 = parseInt(b.LineID.replace('Line_', ''));
        return vl1 - vl2;
    })
    Lines.forEach(l => {
        for (let k = 1; k <= Quedas; k++) {

            !l[`p${k}`] ? l[`p${k}`] = 0 : l[`p${1}`] == 0 ? 0 : l[`p${k}`];
            !l[`a${k}`] ? l[`a${k}`] = 0 : l[`a${1}`] == 0 ? 0 : l[`a${k}`];

            // l[`p${k}`] == 0 ? 0 : l[`p${k}`];
            // l[`a${k}`] == 0 ? 0 : l[`a${k}`];
        }

        let nav = document.getElementById('NavBar');
        let tagLines = document.createElement('span');
        newID == l.LineID ? tagLines.classList.add('ativ') : tagLines.classList.remove('ativ');
        tagLines.textContent = l.NameLine;
        tagLines.id = l.LineID;
        nav.appendChild(tagLines)
        tagLines.addEventListener('click', () => {
            oldID = newID;
            newID = tagLines.id;
            document.getElementById(oldID).classList.remove('ativ');
            document.getElementById(newID).classList.add('ativ');
            Lines.forEach(x => {
                if (x.LineID == newID) {
                    document.getElementById('Line').value = x.NameLine.includes('Line') ? '' : x.NameLine;
                    for (let y = 1; y <= Quedas; y++) {
                        document.getElementById(`p${y}`).value = x[`p${y}`] != 0 ? x[`p${y}`] : '';
                        document.getElementById(`a${y}`).value = x[`a${y}`] != 0 ? x[`a${y}`] : '';
                        ValidacaoQueda(document.getElementById(`p${y}`), document.getElementById(`r${y}`).id, document.getElementById(`s`).id)
                    }
                }
            })
            if (endtable) {
                TabelaEnd();
            }
            localStorage.setItem('newID', newID);
            localStorage.setItem('oldID', oldID);
        })
    })
    TblEnd();
    Inicio();
    localStorage.setItem('Lines', JSON.stringify(Lines))
    saveLinesToPHP();
})
function Inicio() {
    document.getElementById('BodyTable').innerHTML = '';
    for (let x = 1; x <= Quedas; x++) {
        let tr = document.createElement('tr');
        for (let y = 1; y <= 4; y++) {
            let td = document.createElement('td');
            let inp = document.createElement('input');
            inp.type = 'number';
            y == 1 ? td.textContent = `#${x}` : y == 4 ? (td.textContent = '', td.id = `r${x}`) : td.appendChild(inp);
            if (y == 2 || y == 3) {
                inp.setAttribute('oninput', `ValidacaoQueda(this, r${x}.id, s.id)`)
            }
            y % 2 == 0 ? inp.id = `p${x}` : inp.id = `a${x}`;
            tr.appendChild(td);
            if (y == 2) {
                inp.addEventListener('blur', () => {
                    let valor = parseInt(inp.value, 10);
                    while (valor < 1 || valor > 12 || isNaN(valor) || valor == null) {
                        if (valor == null) { break }
                        valor = prompt("Digite um número que esteja entre 1 e 12!")
                        inp.value = valor;
                        ValidacaoQueda(inp, document.getElementById(`r${x}`).id, document.getElementById('s').id)
                    }
                })
            }
        }
        document.getElementById('BodyTable').appendChild(tr);
    }
    Lines.forEach(x => {
        if (x.LineID == newID) {
            document.getElementById('Line').value = x.NameLine.includes('Line') ? '' : x.NameLine;
            for (let y = 1; y <= Quedas; y++) {
                document.getElementById(`p${y}`).value = x[`p${y}`] != 0 ? x[`p${y}`] : '';
                document.getElementById(`a${y}`).value = x[`a${y}`] != 0 ? x[`a${y}`] : '';
                ValidacaoQueda(document.getElementById(`p${y}`), document.getElementById(`r${y}`).id, document.getElementById(`s`).id)
            }
        }
    })
}

function addrem(btn) {
    if (btn.innerHTML == '+' && Quedas < 10) {
        Quedas++;
        Lines.forEach(line => {
            line[`p${Quedas}`] = 0;
            line[`a${Quedas}`] = 0;
        })
    }
    else if (btn.innerHTML == '-' && Quedas > 1) {
        Lines.forEach(line => {
            delete line[`p${Quedas}`];
            delete line[`a${Quedas}`];
        })
        Quedas--;
    }
    localStorage.setItem('Quedas', Quedas);
    saveQuedasToPHP();
    Inicio();
}


function NameLine(inp) {
    Lines.forEach(l => {
        if (l.LineID == newID) {
            l.NameLine = inp.value != '' ? inp.value : newID.replace("_", " ");
            document.getElementById(newID).innerText = inp.value != '' ? inp.value : newID.replace("_", " ");
        }
    })
    localStorage.setItem('Lines', JSON.stringify(Lines))
    saveLinesToPHP();
}
function ValidacaoQueda(i, r, s) {
    Lines.forEach(l => {
        if (l.LineID == newID) {
            for (let x in l) {
                if (x == i.id) {
                    l[x] = i.value
                    localStorage.setItem('Lines', JSON.stringify(Lines))
                }
            }
        }
    })
    let p = document.getElementById(i.id.replace('a', 'p'));
    let a = document.getElementById(i.id.replace('p', 'a'));

    if (p.value == 1) {
        document.getElementById(r).innerText = 12 + parseInt(a.value != 0 ? a.value : 0);
    }
    else if (p.value >= 2 && p.value <= 10) {
        document.getElementById(r).innerText = 11 - parseInt(p.value) + parseInt(a.value != 0 ? a.value : 0);
    }
    else if (p.value >= 11 || p.value == '' || p.value == 0) {
        document.getElementById(r).innerText = a.value != '' ? parseInt(a.value != 0 ? a.value : 0) : '';
    }

    Lines.forEach(v => {
        let res = 0;
        for (let x = 1; x <= Quedas; x++) {
            if (v[`p${x}`] == 1) {
                res += 12 + parseInt(v[`a${x}`]);
            }
            else if (v[`p${x}`] >= 2 && v[`p${x}`] <= 10) {
                res += (11 - parseInt(v[`p${x}`]) + parseInt(v[`a${x}`]));
            }
            else if (v[`p${x}`] >= 11 || v[`p${x}`] == 0 || v[`p${x}`] == '') {
                res += parseInt(v[`a${x}`]);
            }
        }
        v.s = res;
        if (v.LineID == newID) {
            document.getElementById(s).innerHTML = v.s != 0 ? v.s : '';
        }
    })
    localStorage.setItem('Lines', JSON.stringify(Lines));
    saveLinesToPHP();
}
let endtable = false;
function TabelaEnd() {
    endtable = endtable ? false : true;
    document.getElementById('divFullTable').style.top = endtable ? '0' : '100%';
    TblEnd();
}

function TblEnd() {
    let tbldiv = document.getElementById('FullTable');
    tbldiv.innerText = ''; // zera a tabela para poder recriala de maneira correta
    Lines.sort((a, b) => {
        if (a.s == b.s) {
            return b.a - a.a
        }
        else {
            return b.s - a.s
        }
    }); // coloca a tabela em ordem decrescente com base a key (s) que contem a soma dos pontos do time

    let c = 0;
    Lines.forEach(l => { // definira quais sao os pontos de abates e colocacao de cada time
        c++;
        let Pqueda = 0;
        let Pabate = 0;
        for (let x = 1; x <= Quedas; x++) {
            if (l[`p${x}`] == 1) {
                Pqueda += 12;
                Pabate += parseInt(l[`a${x}`]);
            }
            else if (l[`p${x}`] >= 2 && l[`p${x}`] <= 10) {
                Pqueda += (11 - parseInt(l[`p${x}`]));
                Pabate += parseInt(l[`a${x}`]);
            }
            else if (l[`p${x}`] >= 11 || l[`p${x}`] == 0 || l[`p${x}`] == '') {
                Pabate += parseInt(l[`a${x}`]);
            }

        }
        l.a = Pabate;
        let trLine = document.createElement('tr');
        for (let y = 1; y <= 5; y++) {
            let td = document.createElement('td');
            // a linha abaixo define os valores da celulas td da tabela sendo 1(Colocao do time na tabela), 2(nome da equipe), 3(pontos de colocacao), 4(pontos de abates) e por ultimo pontuaco geral do time 
            td.innerText = y == 1 ? c : y == 2 ? (!l.NameLine.includes('Line') ? l.NameLine : l.s > 0 ? l.LineID.replace("_", " ") : '') : y == 3 ? Pqueda : y == 4 ? Pabate : l.s;
            trLine.appendChild(td);
        }
        tbldiv.appendChild(trLine);
    })
}


function saveLinesToPHP() {
    let linesData = JSON.stringify(Lines); // Converte o objeto Lines em uma string JSON
    fetch('back/app.php?dados=' + encodeURIComponent(linesData))
        .then(response => response.text())
        .then(data => {
            console.log('Dados salvos com sucesso:');
        })
        .catch(error => {
            console.error('Erro ao salvar os dados:', error);
        });
}
function saveQuedasToPHP() {
    let linesData = JSON.stringify(Quedas); // Converte o objeto Lines em uma string JSON
    fetch('back/app.php?q=' + encodeURIComponent(linesData))
        .then(response => response.text())
        .then(data => {
            console.log('Dados salvos com sucesso:');
        })
        .catch(error => {
            console.error('Erro ao salvar os dados:', error);
        });
}
