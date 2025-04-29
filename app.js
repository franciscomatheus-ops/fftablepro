document.addEventListener("DOMContentLoaded", () => {
    LinesMenu();
    CriacaoTwoTables();
    let c = JSON.parse(localStorage.getItem('Configs'));

    if(c.Menu.TableShow){
        c.Menu.TableShow = false;
        SendArray(c);
    }
});

function LinesMenu() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let divLines = document.getElementById("LinesTags");
    divLines.innerHTML = '';
    Configs.Lines.forEach(Line => {
        divLines.innerHTML += `
            <span id=${Line.LineID} onclick=LineClick(this.id) ${Configs.Menu.LineChose == Line.LineID ? "class=LineActive" : ''}>${Line.NameLine}</span>
        `;
    });
}

function LineClick(line) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Menu.OldLine = Configs.Menu.LineChose;
    Configs.Menu.LineChose = line;
    console.log(`${line} acionada!`)
    localStorage.setItem('Configs', JSON.stringify(Configs));
    LinesMenu();
    
    if(Configs.Menu.TableShow){
        document.getElementById('FullTable').style.top = "100%";
        Configs.Menu.TableShow = false;
        SendArray(Configs);
    }
    validarTable();
}

function CriacaoTwoTables() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let mainDiv = document.getElementById('TwoTables');
    mainDiv.innerHTML = '';

    let PartidasPontos = "";
    let PartidasAbates = "";


    for (let x = 1; x <= Configs.Menu.Quedas; x++) {
        PartidasPontos += `
            <tr>
                <td>#${x}</td>
                <td><input type=number id=q${x} oninput="ValueUpdate(this.id, this.value, p${x})"></td>
                <td><input type=number id=a${x} oninput="ValueUpdate(this.id, this.value, p${x})"></td>
                <td id=p${x}></td>
            </tr>`;
        PartidasAbates += `
            <tr>
                <td>#${x}</td>
                <td><input type=number id=p1q${x} oninput="KillUpdate(this.id, this.value)"></td>
                <td><input type=number id=p2q${x} oninput="KillUpdate(this.id, this.value)"></td>
                <td><input type=number id=p3q${x} oninput="KillUpdate(this.id, this.value)"></td>
                <td><input type=number id=p4q${x} oninput="KillUpdate(this.id, this.value)"></td>
            </tr>`;
    }

    mainDiv.innerHTML += `
        <table id=table1 class=TableChose>
            <tr>
                <td>Line</td>
                <td colspan=3><input type=text oninput=RenameLine(this.value) id=NameLine></td>
                <td rowspan=${Configs.Menu.Quedas + 3} class="btnPlayer btnSwitch" onclick="SwitchTbl(2)">Players</td>
            </tr>
            <tr>
                <td>Quedas</td>
                <td>Posição</td>
                <td>Abates</td>
                <td>Pontos</td>
            </tr>
            ${PartidasPontos}
            <tr>
                <td colspan=3>Pontuação</td>
                <td id=res>0</td>
            </tr>
        </table>

        <table id=table2 class=TableNoChose>
            <tr>
                <td colspan=5>Abates Individuais</td>
                <td rowspan=${Configs.Menu.Quedas + 2} class="btnPlayer btnSwitch" onclick="SwitchTbl(1)">Quedas</td>
            </tr>
            <tr>
                <td>Partidas</td>
                <td><input id=j1 type=text placeholder=Jogador1 oninput="RenamePlayer(this.id, this.value)"></td>
                <td><input id=j2 type=text placeholder=Jogador2 oninput="RenamePlayer(this.id, this.value)"></td>
                <td><input id=j3 type=text placeholder=Jogador3 oninput="RenamePlayer(this.id, this.value)"></td>
                <td><input id=j4 type=text placeholder=Jogador4 oninput="RenamePlayer(this.id, this.value)"></td>
            </tr>
            ${PartidasAbates}
        </table>        
        <span class="removTbl" onclick="remTbl()">Apagar Tabela</span>                                    
    `;
    validarTable();
}

function remTbl(){
    var a = confirm('Deseja mesmo apagar todos os dados da tabela?');
    if(a){
        localStorage.clear();
        window.location.reload();
    }
    else{
        alert('Voçê desistiu da ação!')
    }
}

function SwitchTbl(key) {
    if (key == 2) {
        document.getElementById('table1').classList = 'TableNoChose';
        document.getElementById('table2').classList = 'TableChose';
    }
    else {
        document.getElementById('table2').classList = 'TableNoChose';
        document.getElementById('table1').classList = 'TableChose';
    }
}

function RenameLine(inp) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Lines.forEach(Line => {
        if (Line.LineID == Configs.Menu.LineChose) {
            document.getElementById(Line.LineID).innerText = inp;
            Line.NameLine = inp;
        }
        // console.log(Configs);

    })
    SendArray(Configs);
}

function RenamePlayer(id, value){
    let pl = JSON.parse(localStorage.getItem('Configs'));
    pl.Player.forEach(p=>{
        if(pl.Menu.LineChose == p.PlayerIDLine && p.PlayerID == id){
            p.PlayerName = value;
        }
    })
    SendArray(pl);
}



function SendArray(Array) {
    localStorage.setItem('Configs', JSON.stringify(Array));
}

function validarTable() {
    let Configs = JSON.parse(localStorage.getItem('Configs'))
    Configs.Lines.forEach(L => {
        if (L.LineID == Configs.Menu.LineChose) {
            document.getElementById(`NameLine`).value = L.NameLine.toLowerCase().includes('line') ? '' : L.NameLine;
            for (let x = 1; x <= Configs.Menu.Quedas; x++) {
                document.getElementById(`a${x}`).value = L[`a${x}`] == 0 ? "" : L[`a${x}`];
                document.getElementById(`q${x}`).value = L[`q${x}`] == 0 ? "" : L[`q${x}`];
                document.getElementById(`p${x}`).innerText = L[`p${x}`] == 0 ? "" : L[`p${x}`];
            }
            document.getElementById('res').innerText = L.res;
        }
    })
    for (let x = 1; x <= 4; x++) {
        for (let y = 1; y <= Configs.Menu.Quedas; y++) {
            let key = `p${x}q${y}`;

            Configs.Player.forEach(p => {
                if (p.PlayerIDLine == Configs.Menu.LineChose && p.hasOwnProperty(key)) {
                    document.getElementById(key).value = p[key] != 0 ? p[key] : '';
                }
            })
        }
    }
    let array = [];
    Configs.Player.forEach(p=>{
        if(p.PlayerIDLine == Configs.Menu.LineChose){
            array.push(p)
        }
    })
    console.log(array);
    
    array.forEach(p=>{
        document.getElementById(p.PlayerID).value = p.PlayerName;
    })
    

}

function ValueUpdate(id, value, ponto) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Lines.forEach(l => {
        if (l.LineID == Configs.Menu.LineChose) {
            l[id] = value == '' ? 0 : parseInt(value)
            let r = 0;
            for (let x = 1; x <= Configs.Menu.Quedas; x++) {
                let a = isNaN(l[`a${x}`]) ? 0 : l[`a${x}`];
                console.log(a);

                if(x == 5){
                    l[`p${x}`] = l[`q${x}`] == 1 ? (12*2) + (l[`a${x}`] * 2) : l[`q${x}`] >= 2 && l[`q${x}`] <= 10 ? ((11 - l[`q${x}`]) * 2) + (l[`a${x}`] * 2) : (l[`a${x}`] * 2);
                    r += l[`p${x}`];
                }
                else{
                    l[`p${x}`] = l[`q${x}`] == 1 ? 12 + l[`a${x}`] : l[`q${x}`] >= 2 && l[`q${x}`] <= 10 ? (11 - l[`q${x}`]) + l[`a${x}`] : l[`a${x}`];
                    r += l[`p${x}`];
                }

                // l[`p${x}`] = l[`q${x}`] == 1 ? 12 + l[`a${x}`] : l[`q${x}`] >= 2 && l[`q${x}`] <= 10 ? (11 - l[`q${x}`]) + l[`a${x}`] : l[`a${x}`];
                // r += l[`p${x}`];
            }
            l.res = r;
            ponto.innerText = l[ponto.id];
            document.getElementById('res').innerText = r;
        }
    })

    SendArray(Configs);
}
function KillUpdate(id, value) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    
    Configs.Player.forEach(l => {
        if (Configs.Menu.LineChose == l.PlayerIDLine && l.hasOwnProperty(id)) {
            l[id] = value != '' ? parseInt(value) : 0;
            let t = 0;
            for (let x = 1; x <= Configs.Menu.Quedas; x++){
                t += parseInt(l[`${id.substring(0, 2)}q${x}`]);
            }
            l.KT = t;
        }
    })

    SendArray(Configs);
    
}
function ShowFullTable() {
    let table = JSON.parse(localStorage.getItem('Configs'));
    if(!table.Menu.TableShow){
        document.getElementById('FullTable').style.top = 0;
        table.Menu.TableShow = true;    
    }
    
    // Verifica se a tabela deve ser mostrada
    if (!table.Menu.TableShow) {
        table.Menu.TableShow = true; // Atualiza para mostrar a tabela
        localStorage.setItem('Configs', JSON.stringify(table)); // Salva a alteração
    }

    // Limpa o conteúdo anterior
    document.getElementById('tbodyEnd').innerHTML = '';

    // Ordena as linhas
    table.Lines.sort((a, b) => {
        if (a.res == b.res) {
            let ak = 0;
            let bk = 0;
            for (let x = 1; x <= 5; x++) {
                ak += a[`a${x}`] || 0;
                bk += b[`a${x}`] || 0;
            }
            return bk - ak;
        } else {
            return b.res - a.res;
        }
    });
    table.Player.sort((a, b) => {
        return b.KT - a.KT;
    })
    for(let x =1;x<=3;x++){
        document.getElementById(`top${x}`).innerText = `${table.Player[x-1].PlayerName} ${table.Player[x-1].KT}`
        console.log(table.Player[x-1]);
    }
    
    // Preenche a tabela
    let id = 0;
    table.Lines.forEach(l => {
        id++;
        let p = 0;
        let a = 0;
        for (let x = 1; x <= table.Menu.Quedas; x++) {
            p += l[`a${x}`] >= l[`p${x}`] ? 0 : l[`p${x}`] - l[`a${x}`];
            a += l[`a${x}`];
        }
        document.getElementById('tbodyEnd').innerHTML += `
            <tr>
                <td>${id}º</td>
                <td>${l.NameLine}</td>
                <td>${p}</td>
                <td>${a}</td>
                <td>${l.res}</td>
            </tr>
        `;
    });
    SendArray(table);
}


// let x = 'p1p3';
// let CaracterX2 = x.substring(0, 2);