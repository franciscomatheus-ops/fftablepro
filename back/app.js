window.Lines = [
    { LineID: 'Line_01', NameLine: 'Line 01', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_02', NameLine: 'Line 02', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_03', NameLine: 'Line 03', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_04', NameLine: 'Line 04', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_05', NameLine: 'Line 05', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_06', NameLine: 'Line 06', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_07', NameLine: 'Line 07', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_08', NameLine: 'Line 08', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_09', NameLine: 'Line 09', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_10', NameLine: 'Line 10', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_11', NameLine: 'Line 11', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 },
    { LineID: 'Line_12', NameLine: 'Line 12', p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, s: 0 }
]
let [newID, oldID] = ['Line_01', ''];
document.addEventListener('DOMContentLoaded', () => {
    TblEnd()
    Lines.forEach(l => {
        let nav = document.getElementById('NavBar');
        let tagLines = document.createElement('span');
        newID == l.LineID ? tagLines.classList.add('ativ') : tagLines.classList.remove('ativ');
        tagLines.textContent = l.NameLine;
        tagLines.id = l.LineID;
        nav.appendChild(tagLines)
        tagLines.addEventListener('click', () => {
            oldID = newID;
            newID = tagLines.id;
            document.getElementById(newID).classList.add('ativ');
            document.getElementById(oldID).classList.remove('ativ');
            Lines.forEach(x => {
                if (x.LineID == newID) {
                    document.getElementById('Line').value = x.NameLine.includes('Line') ? '' : x.NameLine;
                    for (let y = 1; y <= 5; y++) {
                        document.getElementById(`p${y}`).value = x[`p${y}`] != 0 ? x[`p${y}`] : '';
                        document.getElementById(`a${y}`).value = x[`a${y}`] != 0 ? x[`a${y}`] : '';
                        ValidacaoQueda(document.getElementById(`p${y}`), document.getElementById(`r${y}`).id, document.getElementById(`s`).id)
                    }
                }
            })
        })
    })

    for (let x = 1; x <= 5; x++) {
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
        }
        document.getElementById('BodyTable').appendChild(tr);
        if (x == 5) {
            let trTotal = document.createElement('tr');
            let total = document.createElement('td');
            total.innerText = 'Total';
            total.setAttribute('colspan', '3')
            let res = document.createElement('td');
            res.id = 's'
            trTotal.append(total, res);
            document.getElementById('BodyTable').appendChild(trTotal);
        }
    }
})

function NameLine(inp) {
    Lines.forEach(l => {
        if (l.LineID == newID) {
            l.NameLine = inp.value;
            document.getElementById(newID).innerText = inp.value != '' ? inp.value : newID.replace("_", " ");
        }
    })
}
function ValidacaoQueda(i, r, s) {
    Lines.forEach(l => {
        if (l.LineID == newID) {
            for (let x in l) {
                if (x == i.id) {
                    l[x] = i.value
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
        for (let x = 1; x <= 5; x++) {
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
}
let endtable = false;
function TabelaEnd() {
    endtable = endtable ? false : true;
    // document.getElementById('divFullTable').style.zIndex = endtable ? '1' : '-1';
    document.getElementById('divFullTable').style.top = endtable ? '0' : '100%';
    TblEnd();
}

function TblEnd() {
    let tbldiv = document.getElementById('FullTable');
    tbldiv.innerText = '';
    Lines.forEach(l => {
        let Pqueda = 0;
        let Pabate = 0;
        for (let x = 1; x <= 5; x++){
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
        let trLine = document.createElement('tr');
        for (let y = 1; y <= 4; y++){
            let td = document.createElement('td');
            td.innerText = y == 1 ? l.NameLine : y == 2 ? Pqueda : y == 3 ? Pabate : l.s;
            trLine.appendChild(td);
        }
        tbldiv.appendChild(trLine);
    })
}
