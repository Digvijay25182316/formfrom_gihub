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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'fullName', headerName: 'Name' ,width:270},
    { field: 'mentorName', headerName: 'Mentor Name' ,width:200},
    { field: 'phoneNumber', headerName: 'Phone Number' ,width:150},
    { field: 'numberOfMembers', headerName: 'Number of Adults', type: 'number' ,width:150},
    { field: 'noOfkids', headerName: 'Number of Kids', type: 'number',width:150 },
    { field: 'travelNeeded', headerName: 'Travel Needed',width:300 },
    { field: 'questions', headerName: 'Questions',width:100 },
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
