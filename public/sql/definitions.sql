
CREATE TABLE IF NOT EXISTS Ingredient (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Recipe (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    cat1 INTEGER,
    cat2 INTEGER,
    cat3 INTEGER,
    cat4 INTEGER
);

CREATE TABLE IF NOT EXISTS RecipeIngredient (
    Id INTEGER PRIMARY KEY,
    RecipeId INTEGER NOT NULL,
    IngredientId INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    Unit TEXT NOT NULL,
    
    FOREIGN KEY (RecipeId) REFERENCES Recipe(Id),
    FOREIGN KEY (IngredientId) REFERENCES Ingredient(Id)
);

CREATE TABLE IF NOT EXISTS RecipeStep (
    Id INTEGER PRIMARY KEY,
    RecipeId INTEGER NOT NULL,
    Step INTEGER NOT NULL,
    Name TEXT,
    Description TEXT,

    FOREIGN KEY (RecipeId) REFERENCES Recipe(Id)
);

CREATE TABLE IF NOT EXISTS DinnerCourse (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);