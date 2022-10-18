import 'dotenv/config';

import ContractTransportRegister from './ContractTransportRegister.js';
// import singer from './Singer.js';

// Register new package
const registerPackage = async (newPackage, receiveAddress) => {
    await ContractTransportRegister.registerPackage(newPackage, receiveAddress)
        // .send({ from: singer.address, gas: process.env.DEFAULT_GAS })
        .then((result) => {
            console.log('Result register: ', result);
        })
        .catch((error) => {
            console.warn('Error: Register pacakge', error);
        });
};

// // Get a package by ID
// const getPackage = async (packageId) => {
//     await ContractTransportRegister.methods
//         .getPackage(packageId)
//         .call()
//         .then((result) => {
//             console.log('result: ', result);
//         })
//         .catch((error) => {
//             console.warn('Error: Get package', error);
//         });
// };

// // Get status of package
// const getPackageStatus = async (packageId) => {
//     await ContractTransportRegister.methods
//         .getPackageStatus(packageId)
//         .call()
//         .then((result) => {
//             console.log('result: ', result);
//         })
//         .catch((error) => {
//             console.warn('Error: Get status package', error);
//         });
// };

// // Update package status
// const updatePackageStatus = async (packageId, newStatus) => {
//     await ContractTransportRegister.methods
//         .updatePackageStatus(packageId, newStatus)
//         .send({ from: singer.address, gas: process.env.DEFAULT_GAS})
//         .then(() => {
//             console.log('result: ', result);
//         })
//         .catch(() => {
//             console.warn('Error: Update package status', error);
//         })
// };

// // Get all packages storage
// const listPackages = async () => {
//     await ContractTransportRegister.methods
//     .listMySentPackages()
//     .call()
//     .then((result) => {
//         console.log('result: ', result);
//     })
//     .catch((error) => {
//         console.warn('Error: List packages', error);
//     });
// };
