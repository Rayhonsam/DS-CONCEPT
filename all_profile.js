import React, { useState, useEffect } from "react";
import { db } from "../serviceAccountKey";
import { getDocs, query, where, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref ,uploadBytes} from "firebase/storage";
import { useLocation } from "react-router-dom";
import './style.css'
import { initializeApp } from "firebase/app";
const AllProfile = () => {
  const location = useLocation();
  const { mail } = location.state;
  const usercollectionref = collection(db, "users");
  const[url,seturl]=useState([])
  const [list, setlist] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      const q = query(usercollectionref, where("mail", "!=", mail));
      try {
        const querysnapshot = await getDocs(q);
        const userList = querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Fetch all download URLs concurrently using Promise.all
        const downloadUrlPromises = userList.map((user) => {
          const imageref = ref(storage, `images/${user.mail}`);
          return getDownloadURL(imageref);
        });

        const urls = await Promise.all(downloadUrlPromises);

        setlist(userList);
        seturl(urls);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [mail, storage]);

  return (
    <>
      <h1>welcome {mail}</h1>
      <table>
        <tr>
          <td>name</td>
          <td>mail</td>
          <td>password</td>
          <td>image</td>
        </tr>
        {list.map((user,index) => (
          <tr key={user.id}>
            {console.log(url)}
            <td>{user.name}</td>
            <td>{user.mail}</td>
            <td>{user.password}</td>
            <td>
              <img src={url[index]} alt="Profile" style={{ width: "100px" }} />
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default AllProfile;
