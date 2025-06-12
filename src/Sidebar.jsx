import React from "react";
import ReactDOM from "react-dom";

const Sidebar = ({setIsHomeTab, setIsLikeTab, setIsWatchTab}) => {
    const handleClickHomeTab = () => {
        setIsHomeTab(true);
        setIsLikeTab(false);
        setIsWatchTab(false);
    }
    const handleClickLikeTab = () => {
        setIsHomeTab(false);
        setIsLikeTab(true);
        setIsWatchTab(false);
    }
    const handleClickWatchTab = () => {
        setIsHomeTab(false);
        setIsLikeTab(false);
        setIsWatchTab(true);
    }
    
    return(
        <section className="sidebar">
            <section className="side_tab_container">
                <section className="side_tab" id="home_tab" onClick={handleClickHomeTab}>
                    <p>🏠</p>
                    <p>Home</p>
                </section>
            </section>
            <section className="side_tab_container">
                <section className="side_tab" id="like_tab" onClick={handleClickLikeTab}>
                    <p style={{color: "red"}}>❤</p>
                    <p>Liked</p>
                </section>
            </section>
            <section className="side_tab_container">
                <section className="side_tab" id="watch_tab" onClick={handleClickWatchTab}>
                    <p style={{color: "cornflowerblue"}}>👁</p>
                    <p>Watched</p>
                </section>
            </section>
        </section>
    );
}

export default Sidebar;