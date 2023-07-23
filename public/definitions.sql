CREATE TABLE IF NOT EXISTS Building (
    BuildingID INTEGER PRIMARY KEY, 
    Name TEXT NOT NULL UNIQUE, 
    CivicNumber INTEGER NOT NULL, 
    Street TEXT NOT NULL, 
    City TEXT NOT NULL, 
    Province TEXT NOT NULL, 
    PostalCode TEXT NOT NULL, 
    Country TEXT NOT NULL, 
    Inactive BOOLEAN DEFAULT 'FALSE'
)
;
CREATE TABLE IF NOT EXISTS CommunicationMethod (
    MethodID INTEGER PRIMARY KEY, 
    Method TEXT NOT NULL UNIQUE, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS Branch (
    BranchID INTEGER PRIMARY KEY, 
    Name TEXT NOT NULL UNIQUE, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS DepartmentProgram (
    DepProgID INTEGER PRIMARY KEY, 
    BranchID INTEGER NOT NULL, 
    LongName TEXT NOT NULL, 
    AbbreviatedName TEXT, 
    Inactive BOOLEAN DEFAULT 'FALSE', 
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT)
;
CREATE TABLE IF NOT EXISTS ResearchCentre (
    CentreID INTEGER PRIMARY KEY, 
    LongName TEXT NOT NULL UNIQUE,
    AbbreviatedName TEXT, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS IssueCategory (
    CatID INTEGER PRIMARY KEY, 
    CatName TEXT NOT NULL UNIQUE, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS ResponsiblePerson (
    EHSPersID INTEGER PRIMARY KEY, 
    FirstName TEXT NOT NULL, 
    LastName TEXT NOT NULL, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS ProgressStatus (
    StatusID INTEGER PRIMARY KEY, 
    Type TEXT NOT NULL UNIQUE, 
    Inactive BOOLEAN DEFAULT 'FALSE')
;
CREATE TABLE IF NOT EXISTS EHSServiceCall (
    ServiceID INTEGER PRIMARY KEY, 
    ContactFName TEXT NOT NULL, 
    ContactLName TEXT NOT NULL, 
    ContactPhone TEXT, 
    ContactExtension TEXT, 
    ContactEmail TEXT, 
    ContactDep INTEGER NOT NULL, 
    ContactRCentre INTEGER NOT NULL, 
    DateContacted DATE NOT NULL, 
    ContactMethod INTEGER, 
    ResponseMethod INTEGER, 
    Category INTEGER NOT NULL, 
    LocationBuilding INTEGER NOT NULL, 
    LocationRoom TEXT, 
    Description TEXT, 
    AssignedTo INTEGER NOT NULL, 
    EHSComment TEXT, 
    TargetDate DATE, 
    Status INTEGER, 
    DateCompleted DATE, 
    FOREIGN KEY (ContactDep) REFERENCES DepartmentProgram(DepProgID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (ContactRCentre) REFERENCES ResearchCentre(CentreID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (ContactMethod) REFERENCES CommunicationMethod(MethodID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (ResponseMethod) REFERENCES CommunicationMethod(MethodID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (Category) REFERENCES IssueCategory(CatID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (LocationBuilding) REFERENCES Building(BuildingID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (AssignedTo) REFERENCES ResponsiblePerson(EHSPersID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (Status) REFERENCES ProgressStatus(StatusID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT)
;
CREATE TABLE IF NOT EXISTS FollowUp (
    FollowUpID INTEGER PRIMARY KEY, 
    EHSServiceID INTEGER NOT NULL, 
    Date DATE NOT NULL, 
    Action TEXT NOT NULL, 
    HoursSpent FLOAT NOT NULL, 
    UNIQUE (FollowUpID, EHSServiceID), 
    FOREIGN KEY (EHSServiceID) REFERENCES EHSServiceCall(ServiceID)
        ON UPDATE CASCADE
        ON DELETE CASCADE)
;
CREATE VIEW IF NOT EXISTS sevice_call_list_active
AS
    SELECT ServiceID, 
            Description,
            Status,
            Category,
            AssignedTo,
            julianday(DATE()) - julianday(DateContacted) AS 'DaysOpen'
    FROM EHSServiceCall
    WHERE status <> 'Completed'
    ORDER BY 6 ASC
;
CREATE VIEW IF NOT EXISTS service_call_list_all 
AS
    SELECT ServiceID, 
            Description,
            Status,
            Category,
            AssignedTo,
            julianday(DATE()) - julianday(DateContacted) AS DaysOpen
    FROM EHSServiceCall
    ORDER BY 6 ASC
;
CREATE VIEW IF NOT EXISTS building_view
AS
    SELECT BuildingID, Name
    FROM Building
    ORDER BY Name 
;
CREATE VIEW IF NOT EXISTS communication_method_view
AS
    SELECT MethodID, Method
    FROM CommunicationMethod
    ORDER BY Method
;
CREATE VIEW IF NOT EXISTS branch_view
AS
    SELECT BranchID, Name
    FROM Branch
    ORDER BY Name
;
CREATE VIEW IF NOT EXISTS dep_prog_view
AS
    SELECT DepProgID, LongName, AbbreviatedName
    FROM DepartmentProgram
    ORDER BY LongName
;
CREATE VIEW IF NOT EXISTS research_centre_view
AS
    SELECT CentreID, LongName, AbbreviatedName
    FROM ResearchCentre
    ORDER BY LongName
;
CREATE VIEW IF NOT EXISTS category_view
AS
    SELECT CatID, CatName
    FROM IssueCategory
    ORDER BY CatName
;
CREATE VIEW IF NOT EXISTS responsible_pers_view
AS
    SELECT EHSPersID, FirstName, LastName
    FROM ResponsiblePerson
    ORDER BY FirstName
;
CREATE VIEW IF NOT EXISTS status_view
AS
    SELECT StatusID, Type
    FROM ProgressStatus
    ORDER BY Type
;
CREATE INDEX IF NOT EXISTS service_call_index ON EHSServiceCall (ServiceID)
;
CREATE INDEX IF NOT EXISTS follow_ups_index ON FollowUp (EHSServiceID)
;