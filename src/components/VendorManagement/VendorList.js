import React, {useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  Button,
} from "@material-ui/core";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import * as api from "../../api/index";
import Notification from '../../utlils/notification';
import AllApplicationErrorHandle from '../../utlils/allApplicationErrorHandle';



const VendorList = () => {
 

  const [vendorList, setVendorList] = useState([]);
 
  const fetchVendorList = async () => {
    try {
      const result = await api.vendorList();
      setVendorList(result.details)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorList();
  }, []);
  console.log(vendorList);



  const activeHandle = async (data) => {
    try {
      const result = await api.activateVendor(data);
      fetchVendorList();
      Notification("Vendor Activated", "success", 1000);
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  const deActiveHandle = async (data) => {
    try {
      const result = await api.deActiveVendor(data);
      fetchVendorList();
      Notification("Vendor Deactivated", "success", 1000);
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  return (
    <div>
      <MaterialTable
        title="VendorList"
        columns={[
          { title: "Business type", field: "businessType" },
          { title: "companyName", field: "companyName" },
          { title: "Country", editable: false, field: "country" },
          { title: "Email", field: "email" },
          {
            title: "Activation",
            field: "id",
            render: (rowData) => (
              <>
              {
                rowData.isActive ? ( 
                  <span 
                  style={{cursor:'pointer'}}
                  onClick={() => {
                  deActiveHandle({
                    id: rowData.id
                    });
                      }}>
                  <ToggleOnIcon fontSize="large" color="secondary"/>
  
                  </span>
                 
                ) : (
                  <span 
                  style={{cursor:'pointer'}}
                  onClick={() => {
                    activeHandle({
                      id: rowData.id
                    });
                      }}
                  >
 <ToggleOffIcon fontSize="large"/>
                  </span>
                )
              }
             </>
            ),
          },
      
          // {
          //   title: "Activation",
          //   field: "id",
          //   render: (rowData) => (
          //     <>

          //     {
          //       rowData.isActive ? ( <Button
          //         size="small"
          //         variant="contained"
          //         style={{backgroundColor:"red", color:"white"}}
          //         onClick={() => {
          //           deActiveHandle({
          //         // interval: rowData.interval,
          //         // productprice: rowData.productprice,
          //         id: rowData.id});
          //         }}
          //       >
          //               deactivate
               
          //       </Button>) : (
          //         <Button
          //         size="small"
          //         variant="contained"
          //         style={{backgroundColor:'green', color:"white"}}
          //         onClick={() => {
          //           activeHandle({
          //         // interval: rowData.interval,
          //         // productprice: parseInt(rowData.productprice),
          //         id: rowData.id});
          //         }}
          //       >
          //            Activate
           
          //       </Button>
          //       )
          //     }
          //    </>
          //   ),
          // },
        ]}
        data={vendorList}
        options={{
          actionsColumnIndex: -1,     
          pageSize: 12,
          pageSizeOptions:[12],
          padding: "dense",

        }}
        detailPanel={rowData => {
          return (
           <p style={{padding:"10px", textAlign:"justify"}}>{rowData.description}</p>
          )
        }}

  
      />
    </div>
  );
};

export default VendorList;
