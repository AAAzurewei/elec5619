import Topbar from "./Topbar";

import { MazeMapWrapper, makeMazeMapInstance } from "./MazeMap";

export default function Main(props){


      const campusId = 440;
      const mapOptions={ 
            center: {lng:151.1872051, lat:-33.8854750 },

            // initial zoom
            zoom: 18,
            zLevel: 3,
            campuses: 440
      }
      const map = makeMazeMapInstance(mapOptions);


      

    return(
        <div className={'appRoot'}>
            <Topbar/>
            
            <div className={'fullscreen-control'}>
        
        <MazeMapWrapper map={map} className={'fullscreen-control'}></MazeMapWrapper>
    </div>                      
        </div>
    )

}