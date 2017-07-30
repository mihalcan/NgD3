https://bost.ocks.org/mike/map/

Download GDAL http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries
intall npm install -g topojson@1
convert data: 
ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'GBR')" countries.json ne_10m_admin_0_countries.shp

topojson -o eu.json --id-property ADM0_A3 --properties name=NAME -- countries.json