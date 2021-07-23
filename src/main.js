import cron from "node-cron";
// import beeper from "beeper";
import axios from "axios";
import { format } from "timeago.js";
import { addContract, getContracts, initDb } from './db.js';
import { updateHUD } from "./hud.js";
import yargs from 'yargs'

const argv = yargs(process.argv.slice(2)).argv

if (argv.term === undefined) {
  console.error('You need to enter a term (i.e. --term TokenName)')
  process.exit()
}

// const assert = (a, b) => console.log(JSON.stringify(a) === JSON.stringify(b));

const TERM = argv.term
initDb(TERM)

const ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/;
const PANCAKESWAP_REGEX = /PancakeSwap/;

const equalStr = (a, b) => a.localeCompare(b) === 0;

async function diff(a1, a2) {
  let a3 = a2;
  a1.forEach(async (addr) => {
    let exists = false;

    a2.forEach(d => {
      if (equalStr(d.contract, addr)) {
        exists = true;
      }
    });
    if (!exists) {
      // NEW CONTRACT
      await addContract(addr)
      // a3 = [...a3, { contract: addr, created_at: new Date() }];
    }
  });
  return a3;
}

async function clean(data) {
  const cleaned = [];
  data.forEach(async (str) => {
    const r1 = str.match(ADDRESS_REGEX);
    const r2 = str.match(PANCAKESWAP_REGEX);
    if (r1 !== null && r2 === null) {
      const addr = r1[0];
      cleaned.push(addr);
    }
  });
  return cleaned;
}

async function query(term) {
  const url = `https://bscscan.com/searchHandler?term=${term}`;
  const { data } = await axios(url);
  const cleaned = await clean(data);

  // console.log(cleaned);
  const oldContracts = getContracts();
  const newContracts = await diff(cleaned, oldContracts);
  if (newContracts.length !== oldContracts.length) {
    // await beeper(5);
  }
}

cron.schedule("*/5 * * * * *", async () => {
  await query(TERM);
});

function createViewData(data) {
  return data.map((d) => [
    // d.contract,
    format(d.created_at),
    `https://bscscan.com/token/${d.contract}`,
  ]);
}

cron.schedule("*/1 * * * * *", () => {
  const data = [["Added", "Link"], ...createViewData(getContracts())];
  // console.log(data);
  updateHUD(data)
});

