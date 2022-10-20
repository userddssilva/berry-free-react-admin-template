import React, { useState, useEffect } from "react";

import EnviosStickyHeadTable from "./Envios";
import SColumns from "./data/envios-list-columns";

import { Input } from "@mui/material";
import myContract from "views/myContract";
import web3 from "views/web";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// const registerPackage = async () => {
//   window.ethereum.request({ method: "eth_requestAccounts" });

//   const web3 = new Web3(window.ethereum);

//   const receiveAddress = await web3.eth.getAccounts();
//   const newPackage = [
//     "iPhone 12 128GB Branco",
//     ["Av Comendador Jose Cruz", "Lago Azul", "Manaus", "AM", "123", "apto 123"],
//   ];

//   await myContract.methods
//     .registerPackage(newPackage, "0xbe2Ed94A81F0a97ACeb21E88c2a69Cfd17631533")
//     .send({ from: receiveAddress[0] })
//     .then((result) => {
//       console.log("Result register: ", result);
//     })
//     .catch((error) => {
//       console.warn("Error: Register pacakge", error);
//     });
// };

const createData = (id, name, status) => {
  return { id, name, status };
};

const formatData = (packagesObject) => {
  let items = [];
  packagesObject.map((item) => {
    let dataStatus = item[5];

    if (dataStatus == "0") dataStatus = "Em processamento";
    if (dataStatus == "1") dataStatus = "Em transporte";
    if (dataStatus == "2") dataStatus = "Entregue";
    if (dataStatus == "3") dataStatus = "Cancelado";

    let data = createData(item[0], item[1], dataStatus);
    items.push(data);
    console.log(data);
  });
  return items;
};

const Listagem = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoadding] = useState(true);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      const receiveAddress = await web3.eth.getAccounts();
      await myContract.methods
        .listMySentPackages()
        .call({ from: receiveAddress[0] })
        .then((res) => {
          console.log(res);
          setPackages(res);
          setIsLoadding(!isLoading);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadding(!isLoading);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {
        !isLoading
          ? <EnviosStickyHeadTable rows={formatData(packages)} columns={SColumns} />
          : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>
      }
    </>
  );
};

export default Listagem;
