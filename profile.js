import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './style.css'
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getStorage,getDownloadURL,uploadBytes,ref} from "firebase/storage";
const Profile = () => {
    const navigate=useNavigate();
    const firebaseConfig = {
        apiKey: "AIzaSyCkAQuvakEjpKmsyck7OBMI2bMPYEA32eI",
        authDomain: "fir-crud-f710b.firebaseapp.com",
        projectId: "fir-crud-f710b",
        storageBucket: "fir-crud-f710b.appspot.com",
        messagingSenderId: "813500038697",
        appId: "1:813500038697:web:696af4527337952ff46638",
        measurementId: "G-YVDSGNV2RC"
      };
    const app=initializeApp(firebaseConfig);
    const storage=getStorage(app);
   useEffect(()=>{
    const imageref=ref(storage,`images/${mail}`);
    getDownloadURL(imageref).then((url)=>{
      seturl(url);
    }).catch((err)=>{
      console.log("error")
    })
   })
  const location = useLocation();
  const { mail, password } = location.state;
  const[image,setimage]=useState(null)
  const[imageurl,seturl]=useState("");
  const handleimage=(e)=>{
    const file=e.target.files[0];
    setimage(file);
    console.log(file)
  }
  const handleupload=()=>{
     if(image)
     {
        const imageref=ref(storage,`images/${mail}`);
        uploadBytes(imageref,image).then(()=>{
          console.log("img uploaded successfully");
          getDownloadURL(imageref).then((url)=>{
              seturl(url);
              console.log("url:",url);
          })
        })
     }
  }
  return (
    <>
      
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="drawer"
        aria-labelledby="drawerLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="drawerLabel"></h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Profile Picture */}
          <img
            src={imageurl}
            alt="Profile Picture"
            id="sam"
          />
          <br />
          <br />
          <br />
          <input type="file" name="profile" onChange={handleimage}/>
          <input type="submit" onClick={handleupload}/>
          {/* Dashboard */}
          <div style={{ color: "#e84393", textDecoration: "none" }}>
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-tachometer-alt"></i>{" "}
              <a href="#" style={{ color: "#e84393", textDecoration: "none" }}>
                Dashboard  welcome {mail}
              </a>
            </h1>
            <hr />

            {/* Preference */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-heart"></i>{" "}
              <a href="{{url_for('preference_page')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Preference
              </a>
            </h1>
            <hr />

            {/* Home */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fa fa-home"></i>{" "}
              <a href="{{url_for('profile')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Home
              </a>
            </h1>
            <hr />

            {/* Edit Profile */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-pencil-alt"></i>{" "}
              <a href="{{url_for('update_profile_page')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Edit Profile
              </a>
            </h1>
            <hr />

            {/* Settings */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-tachometer-alt"></i> Settings
            </h1>
            <hr />

            {/* Logout */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-exchange-alt"></i>{" "}
              <a href="{{url_for('logout_page')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Logout
              </a>
            </h1>
            <hr />

            {/* Payment */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-exchange-alt"></i>{" "}
              <a href="{{url_for('payment_page')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Payment
              </a>
            </h1>
            <hr />

            {/* Transactions */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-sign-out-alt"></i>{" "}
              <a href="{{url_for('transaction_page')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Transactions
              </a>
            </h1>
            <hr />

            {/* Feedback */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-pencil-alt"></i>{" "}
              <a href="{{url_for('feedback')}}" style={{ color: "#e84393", textDecoration: "none" }}>
                Feedback
              </a>
            </h1>
            <hr />

            {/* All Profile */}
            <h1 id="dash" style={{ fontSize: "20px" }}>
              <i className="fas fa-pencil-alt"></i>{" "}
              <button type="button" style={{ color: "#e84393", textDecoration: "none" }} onClick={()=>navigate("/all_profile",{state:{mail:mail}})}>all profile</button>
            </h1>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
