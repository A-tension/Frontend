import banner from "../assets/landingimagenobutton.png";
import concengroup from "../assets/concengroup.png";
import uigroup from "../assets/uigroup.png";
import groupgroup from "../assets/groupgroup.png";
import gamegroup from "../assets/gamegroup.png";
import footerimage from "../assets/footerimage.png";
import "../App.css";

function Landing() {
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <img src={banner} alt="Banner" />
                <div id="features">
                    <img src={concengroup} alt="Concen Group" style={{ width: "85%", margin: "0 auto" }} />
                    <img src={uigroup} alt="UI Group" style={{ width: "85%", margin: "0 auto" }} />
                    <img src={groupgroup} alt="Group Group" style={{ width: "85%", margin: "0 auto" }} />
                    <img src={gamegroup} alt="Game Group" style={{ width: "85%", margin: "0 auto" }} />
                </div>
                <img src={footerimage} alt="Footer" style={{ width: "100%", height: "auto", maxHeight: "400px", margin: "0 auto" }} />
            </div>
        </>
    );
}

export default Landing;