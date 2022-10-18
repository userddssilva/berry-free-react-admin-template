import EnviosStickyHeadTable from './Envios';
import SRows from './data/envios-list-linhas';
import SColumns from './data/envios-list-columns';
import myContract from 'views/myContract';

// Get all packages storage
const listPackages = async () => {
  await myContract.methods
    .listMySentPackages()
    .call()
    .then((result) => {
      console.log("result: ", result);
    })
    .catch((error) => {
      console.warn("Error: List packages", error);
    });
};

const Listagem = () => {
    return (
        <>
            <button onClick={listPackages}>Activate Lasers</button>
            <EnviosStickyHeadTable rows={SRows} columns={SColumns} />
        </>
    );
};

export default Listagem;
