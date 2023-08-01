const { promisify } = require('util');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron')


class SQLite3 {
    constructor(instance) {
        this.db = instance
        this.all = promisify(this.db.all.bind(this.db));
    }
    async GetTables ()  {
        return await this.all("SELECT name FROM sqlite_schema WHERE name NOT LIKE 'sqlite_%'")
    }
    async GetRecipes ()  {
        return await this.all("SELECT * FROM Recipe")
    }
    async GetRecipeIngredients(event, recipe)  {
        return await this.all(`  
            SELECT 
                Ingredient.Name AS Name, 
                RecipeIngredient.Quantity, 
                RecipeIngredient.Unit 
            FROM 
                RecipeIngredient
            INNER JOIN Recipe on Recipe.Id = RecipeIngredient.RecipeId
            INNER JOIN Ingredient on Ingredient.Id = RecipeIngredient.IngredientId
            WHERE
                Recipe.Name = ?
            `, 
            [recipe]
        )
    }
    async GetRecipeSteps(event, recipe)  {
        console.log(recipe)
        return await this.all(`
            SELECT  
                RecipeStep.Step AS Step, 
                RecipeStep.Name AS Name,
                RecipeStep.Description AS Description
            FROM 
                RecipeStep
            INNER JOIN Recipe on Recipe.Id = RecipeStep.RecipeId
            WHERE
                Recipe.Name = ?
            `, 
            [recipe]
        )
    }

};


let registeredFunction = {}

function RegisterImplementation(object) {
    // Register all the methods as ipc handles
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

    for (let method of Object.getOwnPropertyNames( classObject.prototype )) {
        namespace.push(method)
    }
    registeredFunction[name] = namespace
}


function OpenDatabase(dbpath) {
    let db = new sqlite3.Database(dbpath);
    let tables = fs.readFileSync(path.join(__dirname, '..', 'sql', 'definitions.sql'), 'utf8')

    db.exec(tables);

    if (isDev) {
        let fakedata = fs.readFileSync(path.join(__dirname, '..', 'sql', 'data.sql'), 'utf8')
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
