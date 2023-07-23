INSERT INTO Building(Name, CivicNumber, Street, City, Province, PostalCode, Country, Inactive) VALUES
    ("Building1", 1, "One Street", "Montreal", "QC", "H3N8R7", "Canada", FALSE),
    ("Building2", 10, "Two Street", "Montreal", "QC", "H3N8R7", "Canada", FALSE),
    ("Building3", 20, "Wall Street", "Montreal", "QC", "H3N8R7", "Canada", FALSE),
    ("Building4", 12, "Cheese Street", "Montreal", "QC", "H3N8R7", "Canada", FALSE),
    ("Building5", 1209, "Sushi Street", "Montreal", "QC", "H3N8R7", "Canada", TRUE)
;

INSERT INTO CommunicationMethod(Method, Inactive) VALUES
    ("Pigeon", FALSE),
    ("Cell", TRUE),
    ("Bottle", TRUE)
;

INSERT INTO Branch(Name, Inactive) VALUES
    ("Tree", FALSE),
    ("Jungle", FALSE),
    ("Leaf", TRUE)
;

INSERT INTO DepartmentProgram(BranchID, LongName, AbbreviatedName, Inactive) VALUES
    (1, "Dep 1", "TD1", FALSE),
    (1, "Dep 2", "TD2", TRUE),
    (1, "Dep 3", "TD3", FALSE),
    
    -- 
    (2, "Dep 1", "JD1", FALSE),
    (2, "Dep 2", "JD2", FALSE),
    (2, "Dep 3", "JD3", FALSE),

    -- 
    (3, "Dep 1", "LD1", FALSE),
    (3, "Dep 2", "LD2", FALSE),
    (3, "Dep 3", "LD3", FALSE)
;

INSERT INTO IssueCategory(CatName, Inactive) VALUES
    ("Cat 1", FALSE),
    ("Cat 2", FALSE),
    ("Cat 3", FALSE),
    ("Cat 4", FALSE)
;

INSERT INTO ResponsiblePerson(FirstName, LastName, Inactive) VALUES
    ("No", "Body", FALSE)
;

INSERT INTO ProgressStatus(Type, Inactive) VALUES
    ("Notgoingtohappen", FALSE),
    ("Afternap", FALSE),
    ("Napping", FALSE),
    ("resolved", FALSE)
;
