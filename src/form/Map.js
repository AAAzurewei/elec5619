import { MazeMapWrapper, makeMazeMapInstance } from './MazeMap';
import {} from "stylis-plugin-rtl";
import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';



export default function Map(){
	const campusId = 0;
	const map = makeMazeMapInstance({campuses: campusId});
	return(
		<div>
			<MazeMapWrapper map={map} />
		</div>

	)
}