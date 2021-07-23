import blessed from "blessed";

let screen = null;
let objects = {
  table: null,
};

function initScreen() {
  if (screen) return;
  screen = blessed.screen({
    smartCSR: true,
  });
}

function initTable() {
  objects.table = blessed.table({
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    border: {
      type: "line",
    },
    style: {
      header: {
        fg: "blue",
        bold: true,
      },
    },
  });
  screen.append(objects.table);
}

export function updateHUD(data) {
  // console.log(data)
  initScreen();
  if (!objects.table) { initTable(); }
  objects.table.setData(data);
  screen.render();
}
