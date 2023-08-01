

INSERT INTO Ingredient(Id, Name) VALUES
    (0, "Flour"),
    (1, "Egg"),
    (2, "Milk"),
    (3, "Salt"),
    (4, "Sugar"),
    (5, "Oil"),
    (6, "Water")
;

INSERT INTO DinnerCourse(Id, Name) VALUES
    (0, "Hors d'oeuvres"),
    (1, "Soup"),
    (2, "Fish"),
    (3, "Main Course"),
    (4, "Salad"),
    (5, "Coffee"),
    (6, "Cheese"),
    (7, "Dessert"),
    (8, "Breakfast"),
;

INSERT INTO Recipe(Id, Name, cat1) VALUES
    (0, "Crêpes", 7)
;

INSERT INTO RecipeIngredient(Id, RecipeId, IngredientId, Quantity, Unit) VALUES
    (0, 0, 0, 300, "gr"),
    (1, 0, 1, 3, "count"),
    (2, 0, 2, 500, "gr"),
    (3, 0, 3, 5, "gr"),
    (4, 0, 4, 10, "gr"),
    (5, 0, 5, 40, "gr"),
    (6, 0, 6, 230, "gr")
;

INSERT INTO RecipeStep(RecipeId, Step, Name, Description) VALUES
    (0, 0, "", "Mix $Milk, $Egg, $Salt, $Sugar, $Oil"),
    (0, 1, "", "Add $Flour step by step"),
    (0, 2, "", "Add $Water"),
    (0, 3, "", "Let rest for 15min")
;

