import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import { DataGrid , GridToolbar } from '@mui/x-data-grid';

function GetData() {
  const [dataRows,setDataRows]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataset = [];
        querySnapshot.forEach((doc,i) => {
          dataset.push({ id:doc.id, ...doc.data().formdata});
        });
        setDataRows(dataset)
        console.log(dataset)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'Fullname', headerName: 'Name' ,width:270},
    { field: 'PhoneNumber', headerName: 'Phone Number' ,width:150},
    { field: 'email', headerName: 'Email' ,width:150},
    { field: 'gender', headerName: 'Gender',width:150 },
    { field: 'city', headerName: 'City',width:150},
    { field: 'language', headerName: 'Language',width:300 },
    { field: 'program', headerName: 'Program',width:200 },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center",flexDirection:"column" }}>
      <div style={{margin:"30px",fontSize:"20px",fontWeight:"bold"}}>Users</div>
    <div style={{ height: "100vh",width:"95vw",marginBottom:"23px"}}>
      <DataGrid rows={dataRows} columns={columns} pageSize={5} slots={{ toolbar: GridToolbar }}/>
    </div>
    </div>
  );
}

export default GetData;
