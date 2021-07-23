import StormDB from 'stormdb'

let engine
let db

export async function addContract(addr, term) {
  db.get('contracts').push({ contract: addr, term, created_at: new Date() })
  await db.save()
}

export function getContracts() {
	return db.get('contracts').value()
}

export function initDb(term) {
  engine = new StormDB.localFileEngine(`./db/${term}.stormdb`)
  db = new StormDB(engine)
  db.default({ contracts: [] })
}
