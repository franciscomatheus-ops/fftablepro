document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("Configs")) {
    let Configs = {
      Menu: { Quedas: 5, LineChose:"Line_01", OldLine:"", TableShow:false},
      Lines: [],
      Player: []
    };
    for (let x = 1; x <= 12; x++){
      let id = x < 10 ? `0${x}` : x;
      Configs.Lines.push({
        NameLine: `Line ${id}`, LineID: `Line_${id}`, a1: 0, q1: 0, p1:0, res: 0
      })
    }
    Configs.Lines.forEach(Lines => {
      for (let x = 1; x <= Configs.Menu.Quedas; x++) {
        Lines[`a${x}`] = Lines.hasOwnProperty(`a${x}`) ? Lines[`a${x}`] : 0;
        Lines[`q${x}`] = Lines.hasOwnProperty(`q${x}`) ? Lines[`q${x}`] : 0;
        Lines[`p${x}`] = Lines.hasOwnProperty(`p${x}`) ? Lines[`p${x}`] : 0;
      }
      for (let x = 1; x <= 4; x++){
        let PlayerOBJ = {
          PlayerName: "", PlayerIDLine: Lines.LineID, KT:0, PlayerID: `j${x}`
        }
        for (let y = 1; y <= Configs.Menu.Quedas; y++){
          PlayerOBJ[`p${x}q${y}`] = 0;
        }
        Configs.Player.push(PlayerOBJ);
      }
    })
    localStorage.setItem("Configs", JSON.stringify(Configs))
    window.location.reload();
  }
});
