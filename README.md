#Insurance Explorer
Code for http://www.mypalmbeachpost.com/insuranceexplorer 

This is an AngularJs Single-Page-Application for viewing stats on the various property insurance providers in Florida.

Charts use Highcharts.js.

This was initially written by Kavya Sukumar of The Palm Beach Post, using data and insights provided by Charles Elmore. Michelle Quigley maintained it for a time. Since then, other members of The Palm Beach Post's data team, including Gurman Bhatia and Mike Stucka, have worked on it.

Data is stored, creatively, in the data folder. The Excel spreadsheet's "master" workbook is the key to the entire project. "names" "addresses" and "ratingsLU" are look-up tables that help make the whole thing work. After updating the Excel file, export the master tab to CSV, then use Node to execute the gbconverter.js script.