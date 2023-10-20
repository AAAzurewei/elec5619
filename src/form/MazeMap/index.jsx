// @flow
import type { Node } from 'react';
import * as React from 'react';

import * as Mazemap from "mazemap/mazemap.min.js"
import "mazemap/mazemap.min.css"
import "./mazemap-wrapper.css"
window.Mazemap = Mazemap;

type Props = {
    map: Mazemap.Map,
    children?: Node,
    className?: string,
};

export function makeMazeMapInstance(search,options: Object): Mazemap.Map {
    const mazemapRoot = document.createElement('div');
    mazemapRoot.className = 'mapRoot';
    const defaultOptions = {
        container: mazemapRoot,
        campuses: 'default',
        center: {lng: 30, lat: 30},
        zoom: 1,
        zLevel: 1,
    };

    const mapOptions = Object.assign({}, defaultOptions, options);

    const map = new Mazemap.Map(mapOptions);
    const searchquery = search;

    map.addControl(new Mazemap.mapboxgl.NavigationControl());

    var mySearch = new Mazemap.Search.SearchController({

        campusid: 440,
        rows: 10,
        withpois: true,
        withbuilding: false,
        withtype: false,
        withcampus: false,
        resultsFormat: 'geojson'

    });


    map.on('load', function(){

        initMapResultsLayer();
        initPopupEffect();
        map.on('click', onMapClick);
        doSearch("J03.06.630.");

    });

    //search
    function doSearch(query){
        // Clear the results output
        printSearchData(null);
        if(!query){
            return(console.log("no query data")) ;
        }
        //document.getElementById("searchQuery").innerHTML = query;

        // Perform a search query using the Search object
        mySearch.search(query).then( response => {
            printSearchData(response.results);
            displayMapResults(response.results);
        });
    }

    function printSearchData(results){
        if(!results){
            //return document.getElementById('search-data').innerHTML = '';
        }
        var jsonStr = JSON.stringify(results, null, 2); // spacing level = 2
        //document.getElementById('search-data').innerHTML = jsonStr;

        console.log(results); // Can also look in your console to see the object there
    }

    function displayMapResults(geojsonResults){
        map.getSource('geojsonresults').setData( geojsonResults );
        var bbox = Mazemap.Util.Turf.bbox(geojsonResults );
        map.fitBounds(bbox, {padding: 100});
    }

    function initMapResultsLayer(){

        // Add a source layer to use with the layer for rendering geojson features
        map.addSource('geojsonresults', {type: 'geojson', data: {type: 'FeatureCollection', features: [] } });

        map.addLayer({
            id: "geojsonresults",
            type: "circle",
            source: "geojsonresults",
            paint: {
                "circle-color": "#fd7526",
                "circle-radius": 7,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff"
            }
        }, 'mm-building-label'); // Add this layer UNDER the building label layers

    }

    function initPopupEffect(){

        // Create a popup, but don't add it to the map yet.
        var popup = new Mazemap.mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        // This is one way to achieve 'mouseover' effect on certain layers
        map.on('mousemove' , function(e) {
            var features = map.queryRenderedFeatures(e.point, {layers: ['geojsonresults']});
            if(!features || features.length < 1){
                popup.remove();
                return;
            }else{
                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(features[0].geometry.coordinates)
                    .setHTML(features[0].properties.title)
                    .addTo(map);
            }
        });
    }

    var mazeMarker;

    function onMapClick(e){
        // Clear existing, if any
        clearPoiMarker();

        var lngLat = e.lngLat;
        var zLevel = map.zLevel;

        const clickData = Mazemap.Util.getMapClickData(map, lngLat, zLevel);

        placeMarker(lngLat, zLevel);
        printClickData(clickData);
    }

    function clearPoiMarker(){
        if(mazeMarker){
            mazeMarker.remove();
        }
    };

    function printClickData(data){
        //var poiStr = JSON.stringify(data, null, 2); // spacing level = 2
        //document.getElementById('click-data').innerHTML = poiStr;

        console.log('Got click data:', data); // Can also look in your console to see the object there
    }

    function placeMarker(lngLat, zLevel){
        mazeMarker = new Mazemap.MazeMarker({
            color: '#ff00cc',
            innerCircle: true,
            innerCircleColor: '#FFF',
            size: 34,
            innerCircleScale: 0.5,
            zLevel: zLevel
        })
        .setLngLat(lngLat)
        .addTo(map);

    }

    var resultMarker = new Mazemap.MazeMarker({
        color: 'rgb(253, 117, 38)',
        innerCircle: true,
        innerCircleColor: '#FFF',
        size: 34,
        innerCircleScale: 0.5,
        zLevel: 1
    })

    function placePoiMarker(poi){
        // Get a center point for the POI, because the data can return a polygon instead of just a point sometimes
        var lngLat = Mazemap.Util.getPoiLngLat(poi);
        var zLevel = poi.properties.zValue;

        resultMarker
        .setLngLat(lngLat)
        .setZLevel(poi.properties.zValue)
        .addTo(map);

        map.zLevel = zLevel;

        map.flyTo({center: lngLat, zoom: 19, duration: 2000});
    }

    /* For debugging, it helps to add the map to global window
       to quickly access methods like window.mazemapinstance.getZoom(), etc.
       To do so, add the line below

       window.mazemapinstance = map;
    */
    return map;
}

export class MazeMapWrapper extends React.Component<Props> {

    _onResizeBound: any;

    componentDidMount(){
        this.props.map.on('resize', this._onResize);
        this._onResize();
    }

    componentWillUnmount(){
        this.props.map.off('resize', this._onResize);
    }

    _onResize = () => {
        this._updateZLevelControlHeight();
    }

    _updateZLevelControlHeight(){
        // Update the zLevelControl maxHeight, if it exists
        const map = this.props.map;

        

        if(map.zLevelControl){
            var height = map.getCanvas().clientHeight;
            var maxHeight = height - 50; // 50 pixels account for margins and spacing
            map.zLevelControl.setMaxHeight(maxHeight);
        }
    }

    render() {
        if( !this.props.map ){
            alert("map doesnt exist");
            return null;
        }

        return (
            <div ref={ (ref) => {
                    ref && ref.appendChild(this.props.map.getContainer() );
                    this.props.map.resize();
                }
            }
            
            className={['mazemapWrapper', this.props.className].join(' ')}> {this.props.children}
            </div>
        );
    }

}