SELECT 
Id,
name, 
Weiss,
WeissRank,
Demotech,
DemotechRank,
PolicyCount,
Total_Complaints,
CASE
	WHEN PolicyCount IS NULL OR TOTAL_Complaints IS NULL THEN NULL
	WHEN PolicyCount <> 0 AND TOTAL_Complaints = 0 THEN -1
	ELSE ROUND((PolicyCount::NUMERIC)/TOTAL_Complaints,3)
END AS Complaint_Ratio
FROM
(
	SELECT *,
	FX_GetSUM(Q1_2014_complaintcount || (q2_2014_complaintcount || ARRAY [q4_2013_complaintcount])) AS TOTAL_Complaints
	from ratingscombined
) Sub
order by id
---------------------
SELECT 
Id,
name, 
address,
city,
domicilestate as state,
zip,
phone,
president,
webaddress,
Weiss,
WeissRank,
Demotech,
DemotechRank,
PolicyCount,
Total_Complaints,
Q4_2013_complaintcount,
Q1_2014_complaintcount,
Q2_2014_complaintcount,
Q4_2013_policycount,
Q1_2014_policycount,
Q2_2014_policycount,
CASE
	WHEN PolicyCount IS NULL OR TOTAL_Complaints IS NULL THEN NULL
	WHEN PolicyCount <> 0 AND TOTAL_Complaints = 0 THEN -1
	ELSE ROUND((PolicyCount::NUMERIC)/TOTAL_Complaints,3)
END AS Complaint_Ratio,
CASE
	WHEN q4_2013_complaintcount IS NULL
			 OR q1_2014_complaintcount IS NULL
			 OR q2_2014_complaintcount IS NULL
				THEN
						true
	ELSE false
END AS isIncomplete
FROM
(
	SELECT *,
	FX_GetSUM(Q1_2014_complaintcount || (q2_2014_complaintcount || ARRAY [q4_2013_complaintcount])) AS TOTAL_Complaints
	from detaileddata
) Sub
order by id
