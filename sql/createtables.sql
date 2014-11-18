SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;

BEGIN;
	DROP TABLE IF EXISTS rawDemotech;
	CREATE TABLE rawDemotech
	(
		Name varchar,
		NAICId varchar,
		Grp varchar,
		Rating varchar
	);
---------------------
DROP TABLE IF EXISTS RawWeiss2014 CASCADE;
CREATE TABLE RawWeiss2014(
	Company varchar,
	GroupName varchar,
	Address varchar,
	City varchar,
	DomicileState varchar,
	Zip varchar,
	Phone varchar,
	President varchar,
	WebAddress varchar,
	CommencedOperations varchar,
	WeissFinancialStrengthRating varchar,
	DirectPremiumsWritten2013 varchar,
	DirectLossesIncurred2013 varchar,
	TotalAssetsasofJune302014 varchar,
	TotalLiabilitiesasofJune302014 varchar,
	Marketshare2013 varchar,
	NetIncome2013 varchar,
	NetIncomeJune2014 varchar,
	CapitalandSurplus2013 varchar,
	CapitalandSurplusJune2014 varchar,
	Reserves2012 varchar,
	Reserves2013 varchar,
	changeinreserves2012to2013 varchar,
	change2012to2013 varchar,
	ReservesJune2014 varchar,
	changeinreserves2013to2014 varchar,
	change2013to2014 varchar,
	changeinreserves2012to2014 varchar,
	change2012to2014 varchar
);

DROP TABLE IF EXISTS rawcomplaintsQ12014 CASCADE;
CREATE TABLE rawcomplaintsQ12014
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);
DROP TABLE IF EXISTS rawcomplaintsQ22014 CASCADE;
CREATE TABLE rawcomplaintsQ22014
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);

DROP TABLE IF EXISTS rawcomplaintsQ42013 CASCADE;
CREATE TABLE rawcomplaintsQ42013
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);

DROP TABLE IF EXISTS RawPolicyCount CASCADE;
CREATE TABLE RawPolicyCount (
	Name VARCHAR,
	PolicyCount INT
);


DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
	Id SERIAL PRIMARY KEY,
	Name varchar,
	GrpName varchar,
	PolicyCount INT,
	Address varchar,
	City varchar,
	DomicileState varchar,
	Zip varchar,
	Phone varchar,
	President varchar,
	WebAddress varchar,
	CommencedOperations varchar
);

DROP TABLE IF EXISTS WeissRating CASCADE;
CREATE TABLE WeissRating (
	Rating VARCHAR PRIMARY KEY,
	Rank INT
);

DROP TABLE IF EXISTS Weiss2014 CASCADE;
CREATE TABLE Weiss2014 (
	Id INT PRIMARY KEY REFERENCES companies(Id),
	Rating VARCHAR NOT NULL
);

DROP TABLE IF EXISTS DemotechRating CASCADE;
CREATE TABLE DemotechRating (
	Rating VARCHAR PRIMARY KEY,
	Rank INT
);

DROP TABLE IF EXISTS DemoTech2014 CASCADE;
CREATE TABLE DemoTech2014 (
	Id INT PRIMARY KEY REFERENCES companies(Id),
	Rating VARCHAR NOT NULL
);

DROP TABLE IF EXISTS ComplaintsQ114 CASCADE;
CREATE TABLE ComplaintsQ114 (
	Id INT PRIMARY KEY REFERENCES companies(Id),
	PolicyCount INT NOT NULL,
	ComplaintCount INT NOT NULL
);

DROP TABLE IF EXISTS ComplaintsQ214 CASCADE;
CREATE TABLE ComplaintsQ214 (
	Id INT PRIMARY KEY REFERENCES companies(Id),
	PolicyCount INT NOT NULL,
	ComplaintCount INT NOT NULL
);

DROP TABLE IF EXISTS ComplaintsQ413 CASCADE;
CREATE TABLE ComplaintsQ413 (
	Id INT PRIMARY KEY REFERENCES companies(Id),
	PolicyCount INT NOT NULL,
	ComplaintCount INT NOT NULL
);

COMMIT;
