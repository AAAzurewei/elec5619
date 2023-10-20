import Topbar from "./Topbar";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { MazeMapWrapper, makeMazeMapInstance } from "./MazeMap";
import DemoApp from "./Timetable";
import * as Mazemap from "mazemap/mazemap.min.js"
import "mazemap/mazemap.min.css"
import "./MazeMap/mazemap-wrapper.css"

export default function Main(props){

        const [search, setSearch] = useState("fisher");
        const [mapInitialized, setMapInitialized] = useState(false);

        const mapOptions={ 
            center: {lng:151.1872051, lat:-33.8854750 },

            // initial zoom
            zoom: 18,
            zLevel: 3,
            campuses: 440
        }

      
      const MyContext = createContext();
      var SearchForm = "";

      async function HandleSearch(){

        SearchForm = {search};
        console.log(SearchForm);

      };

      useEffect(() => {
        if (!mapInitialized) {
            // 创建地图实例
            
            //initializeMap();
            setMapInitialized(true);
        }
    }, [mapInitialized]);

    const map = makeMazeMapInstance("",mapOptions);

    return(
        <div className={'appRoot'}>

            <Topbar/>
                        
            <input
                type='text'
                placeholder='text'
                onChange={(e)=>setSearch(e.target.value)}></input>

            <button onClick={()=>HandleSearch()}>search</button>

            <div className={'mapConponent'}>
            <div id="suggestions"></div>
                <MazeMapWrapper map={map} className={'fullscreen-control'}></MazeMapWrapper>        
                                 
            </div>                      
        </div>
    )

}