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
	FX_GetSUM(q2_2014_complaintcount || ARRAY [q4_2013_complaintcount]) AS TOTAL_Complaints
	from ratingscombined
) Sub
