DROP TABLE IF EXISTS RatingsCombined;
SELECT
	C.id,
	C.name,
	W.rating AS Weiss,
	WR.Rank AS WeissRank,
	D.rating AS Demotech,
	DR.Rank AS DemoTechRank,
	C.PolicyCount,
	Q4.complaintcount AS Q4_2013_complaintcount,
	Q1.complaintcount AS Q1_2014_complaintcount,
	Q2.complaintcount  AS Q2_2014_complaintcount
INTO RatingsCombined
FROM weiss2014 W
INNER JOIN companies C ON W.id = C.id
LEFT JOIN demotech2014 D ON D.id = W.id
LEFT JOIN complaintsq413 Q4 ON Q4.id = W.id
LEFT JOIN complaintsq114 Q1 ON Q1.id = W.id
LEFT JOIN complaintsq214 Q2 ON Q2.id = W.id
LEFT JOIN weissrating WR ON WR.rating = W.rating
LEFT JOIN demotechrating DR ON DR.rating = D.rating;

UPDATE RatingsCombined
SET demotech = 'No Data',
demotechrank = (Select rank from demotechrating where rating = 'No Data')
Where demotech IS NULL;
------------------------------
DROP TABLE IF EXISTS DetailedData;
SELECT
	C.id,
	C.name,
	C.address,
	C.city,
	C.domicilestate,
	C.zip,
	C.phone,
	C.president,
	C.webaddress,
	W.rating AS Weiss,
	WR.Rank AS WeissRank,
	D.rating AS Demotech,
	DR.Rank AS DemoTechRank,
	C.PolicyCount,
	Q4.complaintcount AS Q4_2013_complaintcount,
	Q1.complaintcount AS Q1_2014_complaintcount,
	Q2.complaintcount  AS Q2_2014_complaintcount,
	Q4.policycount AS Q4_2013_policycount,
	Q1.policycount AS Q1_2014_policycount,
	Q2.policycount  AS Q2_2014_policycount
INTO DetailedData
FROM weiss2014 W
INNER JOIN companies C ON W.id = C.id
LEFT JOIN demotech2014 D ON D.id = W.id
LEFT JOIN complaintsq413 Q4 ON Q4.id = W.id
LEFT JOIN complaintsq114 Q1 ON Q1.id = W.id
LEFT JOIN complaintsq214 Q2 ON Q2.id = W.id
LEFT JOIN weissrating WR ON WR.rating = W.rating
LEFT JOIN demotechrating DR ON DR.rating = D.rating;

UPDATE DetailedData
SET demotech = 'No Data',
demotechrank = (Select rank from demotechrating where rating = 'No Data')
Where demotech IS NULL;

UPDATE detaileddata
SET name = initcap(Name),
address = initcap(address),
City = initcap(City),
president =initcap(president);