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

  getNewIdFromTable(table) {
    const data = this.#database[table] ?? []

    return data.length === 0 ? 1 : (this.#database[table][data.length - 1].id + 1)
  }

  insert(table, data) {
    const id = this.getNewIdFromTable(table);
    const task = { id, ...data }

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persist()

    return { statusCode: 201, message: 'Task created' }
  }

  getAll(table) {
    const data = this.#database[table]

    return { statusCode: 200, message: data }
  }

  delete(table,primaryKey) {
    const rowIndex = this.#database[table].findIndex(row => row.id.toString() === primaryKey.toString())

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex,1)
      this.#persist()
    }

    return { statusCode: 204, message: '' }
  }

  update(table,id,data) {
    const rowIndex = this.#database[table].findIndex(row => row.id.toString() === id.toString())

    if (rowIndex > -1) {
      const oldRow = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = {
        ...oldRow,
        title: data.title,
        description: data.description,
        updated_at: new Date()
      }
      this.#persist()
    } else {
      return { statusCode: 500, message: 'ID not found' }
    }

    return { statusCode: 200, message: data }
  }

  checkComplete(table,id) {
    const rowIndex = this.#database[table].findIndex(row => row.id.toString() === id.toString())

    if (rowIndex > -1) {
      const oldRow = this.#database[table][rowIndex]
      if (oldRow.completed_at === null) {
        this.#database[table][rowIndex] = {
          ...oldRow,
          updated_at: new Date(),
          completed_at: new Date(),
        }
      } else {
        this.#database[table][rowIndex] = {
          ...oldRow,
          updated_at: new Date(),
          completed_at: null
        }
      }
      this.#persist()
    }else {
      return { statusCode: 500, message: 'ID not found' }
    }
    
    return { statusCode: 200, message: this.#database[table][rowIndex] }
  }
}