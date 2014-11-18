COPY rawdemotech from 'C:\git\dailies\insuranceexplorer\data\Demotech.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawdemotech from 'C:\git\dailies\insuranceexplorer\data\NotRated.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawweiss2014 from 'C:\git\dailies\insuranceexplorer\data\Weiss.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawcomplaintsq42013 from 'C:\git\dailies\insuranceexplorer\data\ComplaintQ42013.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawcomplaintsq12014 from 'C:\git\dailies\insuranceexplorer\data\complaintq12014.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawcomplaintsq22014 from 'C:\git\dailies\insuranceexplorer\data\complaintq22014.csv' WITH CSV HEADER DELIMITER AS ',';
COPY rawpolicycount from 'C:\git\dailies\insuranceexplorer\data\marketshare.csv' WITH CSV HEADER DELIMITER AS ',';
