param(
    $u ='postgres',
    $p = 5432,
    $db = 'insurance',
    $nuke = 0
)

$ErrorActionPreference ="stop"


#nuke and create new if required
if ($nuke -eq 1){
    Write-host "Resetting database and tables"
    # fresh start
    PSQL -U $u -h localhost -p $p -w -c "drop database if exists $db"
    CREATEDB -U $u $db

    # create tables
    PSQL -U $u -h localhost -p $p -w -d $db -f ./sql/CreateTables.sql
    }

write-host "importing data"
#import raw data
get-childitem '..\..\data\STAC\editted*.csv' -File | foreach {
    write-host "processing $_ " 
    $folder = $_.fullname 
    PSQL -U $u -h localhost -p $p -d $db -w -c "COPY rawStac from '$folder' WITH CSV HEADER DELIMITER AS ','"
}
