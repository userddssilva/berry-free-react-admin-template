import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

// select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';


import web3 from "views/web";
import myContract from "views/myContract";

// Para as margens
const useStyles = makeStyles({
	field: {
		marginTop: 10,
		marginBottom: 10,
		marginRight: 10,
	},
});

const getPackage = async (packageId) => {
	const sendAddress = await web3.eth.getAccounts();
	return await myContract.methods
		.getPackage(packageId)
		.call({ from: sendAddress[0] })
		.then((result) => {
			console.log("Result: ", result);
			return result;
		})
		.catch((error) => {
			console.warn("Error: Package not found or without permission", error);
		});
};

const updatePackage = async (pacakgeId, newStatus) => {
	const sendAddress = await web3.eth.getAccounts();
	await myContract.methods.updatePackageStatus(pacakgeId, newStatus)
		.send({ from: sendAddress[0] })
		.then((res) => {
			console.log("Resonse: ", res);
		})
		.catch((err) => {
			console.log("Fails: ", err);
		});
}

const UpdateComponent = () => {
	const classes = useStyles();

	const [idPacote, setIdPacote] = useState("");

	const [estado, setEstado] = useState("");
	const [cidade, setCidade] = useState("");
	const [bairro, setBairro] = useState("");
	const [rua, setRua] = useState("");
	const [numero, setNumero] = useState("");
	const [complemento, setComplemento] = useState("");
	const [hash, setHash] = useState("");
	const [desc, setDesc] = useState("");
	const [status, setStatus] = useState("");
	const [novoStatus, setNovoStatus] = useState("");


	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	const handleUpdateStatus = (e) => {
		e.preventDefault();
		updatePackage(idPacote, status);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (idPacote) {
			console.log(idPacote);
			getPackage(idPacote)
				.then((data) => {
					setRua(data["deliveryAddress"]["name"]);
					setBairro(data["deliveryAddress"]["district"]);
					setNumero(data["deliveryAddress"]["number"]);
					setCidade(data["deliveryAddress"]["city"]);
					setEstado(data["deliveryAddress"]["state"]);
					setComplemento(data["deliveryAddress"]["complement"]);
					setHash(data["receiver"]);
					setDesc(data["description"]);
					setStatus(data["status"]);

					// const dataStatus = data["status"];
					// if (dataStatus == "0") setStatus("Em processamento");
					// if (dataStatus == "1") setStatus("Em transporte");
					// if (dataStatus == "2") setStatus("Entregue");
					// if (dataStatus == "3") setStatus("Cancelado");
				})
				.catch(console.log("Não Encontrado!"));
		}
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: 300, maxWidth: "100%" },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<Typography variant="h5" gutterBottom>
					Buscar envio
				</Typography>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<TextField
						id="outlined-multiline-flexible"
						label="ID do pacote"
						multiline
						onChange={(e) => setIdPacote(e.target.value)}
						className={classes.field}
						sx={{
							"& .MuiTextField-root": { m: 1, width: "70%", maxWidth: "100%" },
						}}
					/>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Button
						size="large"
						variant="contained"
						margin="hard"
						onClick={handleSubmit}
					>
						Buscar
					</Button>
				</div>
			</div>
			<div>
				<br />
				<Typography variant="h4" gutterBottom>
					Dados
				</Typography>
				<Typography variant="h5" gutterBottom>
					Endereço do Envio
				</Typography>
			</div>
			<div label="Pacote">
				<TextField
					id="outlined-multiline-flexible"
					label="Estado do Brasil"
					multiline
					disabled
					value={estado}
					className={classes.field}
				/>
				<TextField
					id="outlined-textarea"
					label="Cidade"
					multiline
					disabled
					value={cidade}
					className={classes.field}
				/>
				<TextField
					id="outlined-textarea"
					label="Bairro ou Distrito"
					multiline
					disabled
					value={bairro}
					className={classes.field}
				/>
				<TextField
					id="outlined-textarea"
					label="Nome da Rua"
					multiline
					disabled
					value={rua}
					className={classes.field}
				/>
				<TextField
					id="outlined-textarea"
					label="Número"
					multiline
					disabled
					value={numero}
					className={classes.field}
				/>
				<TextField
					id="outlined-textarea"
					label="Complemento"
					multiline
					disabled
					value={complemento}
					className={classes.field}
				/>
			</div>
			<p></p>
			<div>
				<Typography variant="h5" gutterBottom>
					Dados do Pacote
				</Typography>
			</div>
			<div label="Pacote">
				<TextField
					id="outlined-multiline-flexible"
					label="Hash Destinatário"
					multiline
					value={hash}
					disabled
					className={classes.field}
				/>
				<TextField
					id="outlined-multiline-flexible"
					label="Descrição do Pacote"
					value={desc}
					className={classes.field}
					multiline
					disabled
				/>
				{/* <TextField
					id="outlined-textarea"
					label="Status do envio"
					multiline
					disabled
					value={status}
					className={classes.field}
				/> */}
				<Select
					id="select-status-envio"
					value={status}
					onChange={handleStatusChange}
					sx={{ m: 1, width: 300, minWidth: "20%" }}
				>
					<MenuItem value={"0"}>Em processamento</MenuItem>
					<MenuItem value={"1"}>Em transporte</MenuItem>
					<MenuItem value={"2"}>Entregue</MenuItem>
					<MenuItem value={"3"}>Cancelado</MenuItem>
				</Select>
			</div>
			<Grid container direction="column" alignItems="center" justify="center">
				<Button onClick={handleUpdateStatus} size="large" variant="contained" margin="hard">
					Atualizar Status
				</Button>
			</Grid>
		</Box>
	);
};

export default UpdateComponent;
