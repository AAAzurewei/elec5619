import { FunctionComponent, useCallback, useState } from 'react';
import styles from './Topbar.module.css';
import logo from '../resources/campuslink_gray.png';

export default function Topbar() {
const onMainTextClick = useCallback(() => {
// Add your code here
}, []);
const onTimetableTextClick = useCallback(() => {
// Add your code here
}, []);

var [searchContent,setSearchContent] = useState("search");
var [mainFunction,setmainFunction] = useState("");



return (
    <div>
<div className={styles.component1}>
    <div className={styles.component1Child} />
    <img className={styles.image25Icon} alt="" src={logo} />
    <div className={styles.main} onClick={onMainTextClick}>Main</div>
    <div className={styles.timetable} onClick={onTimetableTextClick}>Timetable</div>
    <div className={styles.map} onClick = {()=>setmainFunction("map")}>map</div>
    <div className={styles.contacts}>contacts</div>
    <div className={styles.div}></div>
    <div className={styles.component1Item} />
    <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <i className={styles.search}>Search</i>
    </div>
</div>
        
    </div>

);
};
