import React, { useState, useEffect } from "react";

import EnviosStickyHeadTable from "./Envios";
import SRows from "./data/envios-list-linhas";
import SColumns from "./data/envios-list-columns";
import myContract from "views/myContract";

import Web3 from "web3";



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

const Listagem = () => {
  const [lResults, setlResults] = useState([]);
  const results = [];

  useEffect(() => {

    const listPackages = async () => {
      window.ethereum.request({ method: "eth_requestAccounts" });
    
      const web3 = new Web3(window.ethereum);
      const receiveAddress = await web3.eth.getAccounts();
    
      await myContract.methods.listMySentPackages().call({ from: receiveAddress[0] })
        .then((result) => {

          for(let i = 0; i < result.length; i++){
            const data = createData(result[0][0], result[0][1], result[0][5]);
            results.includes(data);
          }

          console.log(results)

          setlResults(results)
        })
        .catch((error) => {
          console.warn("Error: List packages", error);
        });
    };

    console.log("lResults: ", lResults);
    console.log("Results: ", results);
  });

  return (
    <>
      <EnviosStickyHeadTable rows={lResults} columns={SColumns} />
    </>
  );
};

export default Listagem;
