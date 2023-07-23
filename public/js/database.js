const { promisify } = require('util');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron')

class BaseDatabase {
    constructor(instance) {
        this.db = instance;
    }

    async get_buildings(event) {}
    async get_department_program(event) {}
    async get_research_centre(event) {}
    async get_communication_method(event) {}
    async get_category(event) {}
    async get_responsibl(event) {}
    async get_status(event) {}
    async get_branch(event) {}
}

class SQLite3 extends BaseDatabase {
    constructor(instance) {
        super(instance)
        this.all = promisify(this.db.all.bind(this.db));
    }
    async get_buildings (event, payload)  {
        return await this.all("SELECT * FROM Building")
    }
    async get_department_program (event, payload)  {
        return await this.all("SELECT * FROM DepartmentProgram")
    }
    async get_research_centre (event, payload) {
        return await this.all("SELECT * FROM ResearchCentre")
    }
    async get_communication_method (event, payload) {
        return await this.all("SELECT * FROM CommunicationMethod")
    }
    async get_category (event, payload)  {
        return await this.all("SELECT * FROM IssueCategory")
    }
    async get_responsible (event, payload) {
        return await this.all("SELECT * FROM ResponsiblePerson")
    }
    async get_status (event, payload)  {
        return await this.all("SELECT * FROM ProgressStatus")
    }
    async get_branch (event, payload)  {
        return await this.all("SELECT * FROM Branch")
    }
};



let registeredFunction = {}


function RegisterImplementation(object) {
    let name = object.constructor.name
    let namespace = []

    for (let method of Object.getOwnPropertyNames(object.constructor.prototype)) {
        ipcMain.handle(name + "/" + method, object[method].bind(object))
        namespace.push(method)
    }

    registeredFunction[name] = namespace
}

function RegisterClass(classObject) {
    let name = classObject.name
    let namespace = []

    for (let method of Object.getOwnPropertyNames( BaseDatabase.prototype )) {
        namespace.push(method)
    }
    registeredFunction[name] = namespace
}


function OpenDatabase(dbpath) {
    let db = new sqlite3.Database(dbpath);
    let tables = fs.readFileSync(path.join(__dirname, '..', 'definitions.sql'), 'utf8')

    db.exec(tables);

    if (isDev) {
        let fakedata = fs.readFileSync(path.join(__dirname, '..', '..', 'tests', 'fakedata.sql'), 'utf8')
        db.exec(fakedata)
    }

    return db
}


function InitializeDatabase(dbpath) {
    let db = OpenDatabase(dbpath)

    database = new SQLite3(db)

    RegisterImplementation(database)

    return database
}

function GetRegisteredFunction() {
    return registeredFunction
}

module.exports = {
    InitializeDatabase,
    GetRegisteredFunction,
    RegisterClass,
    RegisterImplementation
}


for (let [key, value] of Object.entries(BaseDatabase)) {
    console.log(key, value)
}