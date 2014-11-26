
INSERT INTO Companies
(
	Name,
	GrpName,
	Address,
	City,
	DomicileState,
	Zip,
	Phone,
	President,
	WebAddress,
	CommencedOperations
)
SELECT
	Company,
	GroupName,
	Address,
	City,
	DomicileState,
	Zip,
	Phone,
	President,
	WebAddress,
	CommencedOperations
FROM rawweiss2014;


/*INSERT INTO Companies
(
	Name,
	GrpName
)
SELECT 
	Name,
	grp
FROM
rawdemotech
WHERE NOT EXISTS
(
	SELECT * FROM Companies
	WHERE Companies.name = rawdemotech.name
);
*/
-------------------------------------------------------
INSERT INTO WeissRating
(Rating, Rank)
VALUES 
('A+',1),
('A',2),
('A-',3),
('B+',4),
('B',5),
('B-',6),
('C+',7),
('C',8),
('C-',9),
('D+',10),
('D',11),
('D-',12),
('E+',13),
('E',14),
('E-',15),
('F',16);

--------------------------------------------------------------

INSERT INTO Weiss2014
SELECT C.id,weissfinancialstrengthrating
FROM companies C
INNER JOIN rawweiss2014 W
ON C.name = W.Company
order by C.id;

--------------------------------------------------------------
INSERT INTO DemotechRating
(Rating, Rank)
VALUES 
(E'FSR - A\'\'',1),
(E'FSR - A\'',2),
('FSR - A',3),
('FSR - S',4),
('FSR - M',5),
('FSR - L',6),
('FSR - NR', 7),
('Not rated',8),
('No Data',9);
----------------------------------------------------------------
INSERT INTO DemoTech2014
	SELECT C.id,rating
FROM companies C
INNER JOIN rawdemotech D
	ON C.name = D.Name
ORDER BY C.id;
-------------------------------------------------------------------
UPDATE rawcomplaintsq12014
SET policiescount = REPLACE(policiescount,',', ''),
complaintscount = REPLACE(complaintscount,',','');

INSERT INTO complaintsq114
	SELECT C.id, 
	R.policiescount::INTEGER,
	R.complaintscount::INTEGER
FROM companies C
INNER JOIN rawcomplaintsq12014 R
	ON C.name = R.Name
ORDER BY C.id;
-------------------------------------------------------------------
UPDATE rawcomplaintsq22014
SET policiescount = REPLACE(policiescount,',', ''),
complaintscount = REPLACE(complaintscount,',','');

INSERT INTO complaintsq214
	SELECT C.id, 
	R.policiescount::INTEGER,
	R.complaintscount::INTEGER
FROM companies C
INNER JOIN rawcomplaintsq22014 R
	ON C.name = R.Name
ORDER BY C.id;
---------------------------------------------------------------------
UPDATE rawcomplaintsq42013
SET policiescount = REPLACE(policiescount,',', ''),
complaintscount = REPLACE(complaintscount,',','');

INSERT INTO complaintsq413
	SELECT C.id, 
	R.policiescount::INTEGER,
	R.complaintscount::INTEGER
FROM companies C
INNER JOIN rawcomplaintsq42013 R
	ON C.name = R.Name
ORDER BY C.id;

------------------------------------
UPDATE Companies C
SET PolicyCount = (
Select policyCount FROM RawPolicyCount P Where C.Name =P.Name);

UPDATE Companies C
SET PolicyCount = (
	SELECT Q.Policycount FROM  complaintsq214 Q
	WHERE Q.policycount IS NOT NULL 
	AND C.id = Q.id
	)
WHERE C.policycount IS NULL;

UPDATE Companies C
SET PolicyCount = (
	SELECT Q.Policycount FROM  complaintsq114 Q
	WHERE Q.policycount IS NOT NULL 
	AND C.id = Q.id
	)
WHERE C.policycount IS NULL;

UPDATE Companies C
SET PolicyCount = (
	SELECT Q.Policycount FROM  complaintsq413 Q
	WHERE Q.policycount IS NOT NULL 
	AND C.id = Q.id
	)
WHERE C.policycount IS NULL;


-------------------------------------------
UPDATE Companies
SET policycount = 381284
Where name like 'STATE FARM FLORIDA INSURANCE COMPANY';