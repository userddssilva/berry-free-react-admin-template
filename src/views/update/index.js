import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import Web3 from "web3";

import UpdateComponent from "./UpdateComponent";
import myContract from "views/myContract";

const UpdateEnvio = () => {
  return (
    <>
      <UpdateComponent />
    </>
  );
};

export default UpdateEnvio;
