SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;

BEGIN;
	DROP TABLE IF EXISTS rawDemotech;
	CREATE TABLE rawDemotech
	(
		Name varchar,
		NAICId varchar,
		Group varchar,
		Rating varchar
	);
---------------------
DROP TABLE IF EXISTS RawWeiss2014 CASCADE;
CREATE TABLE RawWesis2014(
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
	2013DirectPremiumsWritten varchar,
	2013DirectLossesIncurred varchar,
	TotalAssetsasofJune302014 varchar,
	TotalLiabilitiesasofJune302014 varchar,
	2013Marketshare varchar,
	NetIncome2013 varchar,
	NetIncomeJune2014 varchar,
	CapitalandSurplus2013 varchar,
	CapitalandSurplusJune2014 varchar,
	2012Reserves varchar,
	2013Reserves varchar,
	2012to2013changeinreserves varchar,
	2012to2013change varchar,
	June2014Reserves varchar,
	2013to2014changeinreserves varchar,
	2013to2014change varchar,
	2012to2014changeinreserves varchar,
	2012to2014changevarchar
);

DROP TABLE IF EXISTS rawcomplaintsQ12014;
CREATE TABLE rawcomplaintsQ12014
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);
DROP TABLE IF EXISTS rawcomplaintsQ22014;
CREATE TABLE rawcomplaintsQ22014
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);

DROP TABLE IF EXISTS rawcomplaintsQ42013;
CREATE TABLE rawcomplaintsQ42013
(
	Name varchar,
	PoliciesCount varchar,
	Complaintscount varchar,
	Ratio varchar
);

COMMIT;
