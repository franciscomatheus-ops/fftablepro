let xt = [];

let [lines, quedas] = [12, 2]

document.addEventListener('DOMContentLoaded', () => {
    for (let x = 1; x <= quedas; x++) {
        let th = document.createElement('th');
        th.textContent = `Queda 0${x}`;
        th.setAttribute('colspan', '2')
        document.getElementById('queda').appendChild(th)
        for (let y = 1; y <= 2; y++) {
            let td = document.createElement('td');
            td.textContent = y == 2 ? 'Abates' : 'posição';
            td.classList = 'title';
            document.getElementById('posabt').appendChild(td)
        }
        if (x == quedas) {
            let ThEnd = document.createElement('th');
            ThEnd.textContent = 'Pontos';
            ThEnd.setAttribute('rowspan', '2')
            document.getElementById('queda').appendChild(ThEnd);
        }
    }
    for (let x = 1; x <= lines; x++) {
        let tr = document.createElement('tr');
        let lines = {}
        lines[`line${x}`] = '';
        for (let y = 1; y <= (quedas * 2) + 1; y++) {
            let td = document.createElement('td');
            let inp = document.createElement('input');
            inp.setAttribute('type', y == 1 ? 'text' : 'number');
            inp.id = y == 1 ? `line${x}` : (y % 2 == 0 ? `pos${y / 2}` : `abt${(y - 1) / 2}`);
            if (y > 1) {
                lines[(y % 2 == 0 ? `pos${y / 2}` : `abt${(y - 1) / 2}`)] = 0;
            }
            inp.setAttribute('oninput', (y == 1 ? 'LineName(this.id, this.value)' : `LineInfo(line${x}.id, this.id, this.value, res${x}.id)`));
            td.appendChild(inp);
            tr.appendChild(td);
            if (y == (quedas * 2 + 1)) {
                let TdEnd = document.createElement('td');
                TdEnd.id = `res${x}`;
                tr.appendChild(TdEnd)
            }
        }
        document.getElementById('bodytable').appendChild(tr);
        lines[`res${x}`] = 0;
        xt.push(lines)
    }
})

function LineName(lineid, linename) {
    xt.forEach(line => {
        for (key in line) {
            if (key == lineid) {
                line[key] = linename;
                // console.log(line);
            }
        }
    })
}

function LineInfo(IdLine, InfoId, InfoValue, ResValue) {
    xt.forEach(Lines => {
        for (id in Lines) {
            if (IdLine == id) {
                Lines[InfoId] = InfoValue;
            }
        }
    })
    let num = 0;
    xt.forEach(line => {
        num++;
        let r = 0;
        for (let n = 1; n <= quedas; n++) {
            if (line[`pos${n}`] == 1) {
                r += (12 + parseInt(line[`abt${n}`]));
            }
            else if (line[`pos${n}`] >= 2 && line[`pos${n}`] <= 10) {
                let p = parseInt(line[`pos${n}`]);
                r += 11 - p + parseInt(line[`abt${n}`]);
            }
            else if (line[`pos${n}`] >= 11 && line[`pos${n}`] <= 12) {
                r += parseInt(line[`abt${n}`]);
            }
        }
        for (let key in line) {
            if (key == ResValue) {
                line[key] = r;
            }
        }
    })
    xt.forEach(x => {
        for (let y in x) {
            if (y == ResValue) {
                document.getElementById(ResValue).innerText = x[y];
                console.log(y);
            }
        }
        
    })
    
}

function reordenar() {
    document.getElementById('bodytable').innerText = '';
    xt.sort((a, b) => {
        let resA = Object.keys(a).filter(key => key.includes('res')).map(key => a[key])[0];
        let resB = Object.keys(b).filter(key => key.includes('res')).map(key => b[key])[0];
        return resB - resA;
    });

    let num = 0;
    xt.forEach(line => {
        num++;
        let tr = document.createElement('tr');
        console.log(line);
        let linename = '';
        for (let x in line) {
            let td = document.createElement('td');
            let inp = document.createElement('input');
            if (x.includes('line')) {
                inp.value = line[x];
                linename = x;
                inp.id = x;
                inp.setAttribute('oninput', 'LineName(this.id, this.value)')
                td.appendChild(inp);
            }
            else if (x != 'res') {
                inp.value = line[x] != 0 ? line[x] : '';
                inp.id = x;
                inp.setAttribute('oninput', `LineInfo(${linename}.id, this.id, this.value, ${linename.replace('line', 'res')}.id)`)
                td.appendChild(inp);
            }
            else {
                td.innerText = line[x] != 0 ? line[x] : '';
                td.id = linename.replace('line', 'res');
            }
            tr.appendChild(td);
        }
        document.getElementById('bodytable').appendChild(tr);
    })
}

