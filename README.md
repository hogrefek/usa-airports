## Project Name/Repository: usa-airports
#### By: Kyle R. Hogrefe

####Introduction:
This map provides information on the number of airports in each state in the U.S. (in chloropleth scale) and individual airport locations symbolized as to whether or not the airport has a control tower. Name of the airport is provided by clicking the symbol at the location of interest.  Latitude/longitude locations are provided by clicking on the map.

#### Major Functions:

**Leaflet > GeoJSON**
- onEachFeature()
- pointToLayer()
- onAdd()
- onMapClick() __*this function was not a specified part of the lab.*__

**Other**
- setColor()
- style()

#### Libraries:
- https://unpkg.com/leaflet@1.3.1/dist/leaflet.js
- https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js
- https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
- https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.4/chroma.min.js

#### Data Sources
- "airports.geojson" was converted from a shapefile that was downloaded and unzipped from:  https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile (DATA.GOV)
- "us-states.geojson" contains data that was aquired form Mike Bostock (https://bost.ocks.org/mike/) of D3 (https://d3js.org/).

#### Acknowledgements
A big thanks to Bo Zhoa for putting together a great lab (not to mention class) to get a fella like me going on creating Web Maps.
