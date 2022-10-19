import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Web3 from 'web3';
import myContract from 'views/myContract';
// Para as margens

const useStyles = makeStyles({
    field: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    }
});


// const listPackages = async () => {
//     window.ethereum.request({ method: "eth_requestAccounts" });

//     const web3 = new Web3(window.ethereum);
//     const receiveAddress = await web3.eth.getAccounts();

//     await myContract.methods
//       .listMySentPackages()
//       .call({ from: receiveAddress[0] })
//       .then((result) => {
//         console.log("result: ", result);
//       })
//       .catch((error) => {
//         console.warn("Error: List packages", error);
//       });
//   };

const getPackage = async (packageId) => {
    window.ethereum.request({ method: "eth_requestAccounts" });

    const web3 = new Web3(window.ethereum);

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

const StatusEnvio = () => {
    const classes = useStyles();

    const [idPacote, setIdPacote] = useState('');

    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [hash, setHash] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [novoStatus, setNovoStatus] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        if (idPacote) {
            console.log(idPacote);
            getPackage(idPacote).then(data => {
                setRua(data["deliveryAddress"]["name"]);
                setBairro(data["deliveryAddress"]["district"]);
                setNumero(data["deliveryAddress"]["number"]);
                setCidade(data["deliveryAddress"]["city"]);
                setEstado(data["deliveryAddress"]["state"]);
                setComplemento(data["deliveryAddress"]["complement"]);
                setHash(data["receiver"]);
                setDesc(data["description"]);

                const dataStatus = data["status"];

                if (dataStatus == "0")
                    setStatus("Em processamento");
                if (dataStatus == "1")
                    setStatus("Em transporte");
                if (dataStatus == "2")
                    setStatus("Entregue");
                if (dataStatus == "3")
                    setStatus("Cancelado");

            }).catch(console.log("Não Encontrado!"))

        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: 300, maxWidth: '100%' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant="h5" gutterBottom>
                    Buscar envio
                </Typography>
                <TextField id="outlined-multiline-flexible" label="ID do pacote" multiline onChange={(e) => setIdPacote(e.target.value)}
                    className={classes.field} />
                <Button size="large" variant="contained" margin="hard" onClick={handleSubmit}>
                    Buscar
                </Button>
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
                <TextField id="outlined-multiline-flexible" label="Estado do Brasil" multiline disabled value={estado}
                    className={classes.field} />
                <TextField id="outlined-textarea" label="Cidade" multiline disabled value={cidade}
                    className={classes.field} />
                <TextField id="outlined-textarea" label="Bairro ou Distrito" multiline disabled value={bairro}
                    className={classes.field} />
                <TextField id="outlined-textarea" label="Nome da Rua" multiline disabled value={rua}
                    className={classes.field} />
                <TextField id="outlined-textarea" label="Número" multiline disabled value={numero}
                    className={classes.field} />
                <TextField id="outlined-textarea" label="Complemento" multiline disabled value={complemento}
                    className={classes.field} />
            </div>
            <p></p>
            <div>
                <Typography variant="h5" gutterBottom>
                    Dados do Pacote
                </Typography>
            </div>
            <div label="Pacote">
                <TextField id="outlined-multiline-flexible" label="Hash Destinatário" multiline value={hash} disabled
                    className={classes.field} />
                <TextField id="outlined-multiline-flexible" label="Descrição do Pacote" value={desc}
                    className={classes.field} multiline disabled />
                <TextField id="outlined-textarea" label="Status do envio" multiline disabled value={status}
                    className={classes.field} />
            </div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Button size="large" variant="contained" margin="hard">
                    Atualizar Status
                </Button>
            </Grid>
        </Box>
    );
};

export default StatusEnvio;
