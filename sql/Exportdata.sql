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
drop table exportstaging;
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
	0.0 AS WeissPercentile,
	Demotech,
	DemotechRank,
	0.0 AS DemotechPercentile,
	PolicyCount,
	Total_Complaints,
	Q4_2013_complaintcount,
	Q1_2014_complaintcount + Q2_2014_complaintcount AS total_2014_complaintcount,
	2*(Q1_2014_complaintcount + Q2_2014_complaintcount) AS projected_2014_complaintcount,
	Q4_2013_policycount,
	Q1_2014_policycount,
	Q2_2014_policycount,
	CASE
		WHEN PolicyCount IS NULL OR TOTAL_Complaints IS NULL THEN NULL
		WHEN PolicyCount <> 0 AND TOTAL_Complaints = 0 THEN -1
		ELSE ROUND((PolicyCount::NUMERIC)/TOTAL_Complaints,2)
	END AS Complaint_Ratio,
	CASE
		WHEN PolicyCount IS NULL OR TOTAL_Complaints IS NULL THEN NULL
		WHEN PolicyCount <> 0 AND TOTAL_Complaints = 0 THEN 0
		ELSE LEAST(10000,ROUND((10000*TOTAL_complaints/(PolicyCount::NUMERIC)),2))
	END AS complaints_per_10k,
	0.0 AS complaintPercentile,
	0 AS complaintpercentilegroup,
	CASE
		WHEN q4_2013_complaintcount IS NULL
				 OR q1_2014_complaintcount IS NULL
				 OR q2_2014_complaintcount IS NULL
			THEN true
		ELSE false
	END AS isIncomplete
INTO exportstaging
FROM
(
	SELECT *,
	FX_GetSUM(Q1_2014_complaintcount || (q2_2014_complaintcount || ARRAY [q4_2013_complaintcount])) AS TOTAL_Complaints
	from detaileddata
) Sub
order by id;

UPDATE exportstaging A
SET complaintPercentile= NULL,
demotechPercentile= NULL,
weissPercentile = NULL,
complaintPercentileGroup=NULL;

UPDATE exportstaging A
SET WeissPercentile = (Select ROUND((100*count(*))::NUMERIC/(select count(*) from exportstaging where Weiss <> 'NR'),2) from exportstaging B where B.weissrank < A.weissrank)
WHERE A.Weiss<>'NR';

UPDATE exportstaging A
SET DemotechRank=7,
Demotech= 'Not Rated'
where demotechrank>=7;

UPDATE exportstaging A
SET DemotechPercentile = (Select ROUND((100*count(*))::NUMERIC/(select count(*) from exportstaging where demotechrank <> 7),2) 
from exportstaging B where B.demotechrank < A.demotechrank)
WHERE A.demotechrank <> 7;

UPDATE exportstaging A
SET complaintPercentile = (Select ROUND((100*count(*))::NUMERIC/(select count(*) from exportstaging where complaints_per_10k is not null),2)
 from exportstaging B where B.complaints_per_10k < A.complaints_per_10k)
 WHERE A.complaints_per_10k is not null;

UPDATE exportstaging
SET complaintPercentileGroup=3
WHERE complaintPercentile is not null;

UPDATE exportstaging
SET complaintPercentileGroup=2
WHERE complaintPercentile <=66.66;
 
UPDATE exportstaging
SET complaintPercentileGroup=1
WHERE complaintPercentile <=33.33;


