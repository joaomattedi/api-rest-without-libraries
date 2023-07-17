import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {};

  constructor(){
    fs.readFile(databasePath,'utf8')
    .then(data => this.#database = JSON.parse(data))
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  countTableData(table) {
    const data = this.#database[table] ?? []

    return data.length
  }

  insert(table, data) {
    const id = this.countTableData(table) + 1;
    const task = { id, ...data }

    if (Array.isArray(this.#database[table])) {
      this.#database.push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persist()

    return { statusCode: 201, message: 'Task created' }
  }
}