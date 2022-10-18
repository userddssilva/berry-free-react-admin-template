import web3 from './web';

const address = '0x8fe218a1B267880Ce20229b9bf8452C630F9A2c7';

const abi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        inputs: [],
        name: 'packagesCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        components: [
                            {
                                internalType: 'string',
                                name: 'name',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'district',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'city',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'state',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'number',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'complement',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct TransportRegister.StreetAddress',
                        name: 'deliveryAddress',
                        type: 'tuple'
                    }
                ],
                internalType: 'struct TransportRegister.PackageData',
                name: 'packageData',
                type: 'tuple'
            },
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address'
            }
        ],
        name: 'registerPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'packageId',
                type: 'string'
            }
        ],
        name: 'getPackage',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'packageId',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address'
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address'
                    },
                    {
                        components: [
                            {
                                internalType: 'string',
                                name: 'name',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'district',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'city',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'state',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'number',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'complement',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct TransportRegister.StreetAddress',
                        name: 'deliveryAddress',
                        type: 'tuple'
                    },
                    {
                        internalType: 'enum TransportRegister.PackageStatus',
                        name: 'status',
                        type: 'uint8'
                    },
                    {
                        internalType: 'uint256',
                        name: 'createdDate',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'lastUpdatedDate',
                        type: 'uint256'
                    },
                    {
                        internalType: 'bool',
                        name: 'exists',
                        type: 'bool'
                    }
                ],
                internalType: 'struct TransportRegister.Package',
                name: '',
                type: 'tuple'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'packageId',
                type: 'string'
            }
        ],
        name: 'getPackageStatus',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'statusMessage',
                        type: 'string'
                    },
                    {
                        internalType: 'enum TransportRegister.PackageStatus',
                        name: 'status',
                        type: 'uint8'
                    },
                    {
                        internalType: 'uint256',
                        name: 'createdDate',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'lastUpdatedDate',
                        type: 'uint256'
                    }
                ],
                internalType: 'struct TransportRegister.PackageStatusDTO',
                name: '',
                type: 'tuple'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'packageId',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: 'newStatus',
                type: 'uint256'
            }
        ],
        name: 'updatePackageStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'listMySentPackages',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'packageId',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address'
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address'
                    },
                    {
                        components: [
                            {
                                internalType: 'string',
                                name: 'name',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'district',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'city',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'state',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'number',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'complement',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct TransportRegister.StreetAddress',
                        name: 'deliveryAddress',
                        type: 'tuple'
                    },
                    {
                        internalType: 'enum TransportRegister.PackageStatus',
                        name: 'status',
                        type: 'uint8'
                    },
                    {
                        internalType: 'uint256',
                        name: 'createdDate',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'lastUpdatedDate',
                        type: 'uint256'
                    },
                    {
                        internalType: 'bool',
                        name: 'exists',
                        type: 'bool'
                    }
                ],
                internalType: 'struct TransportRegister.Package[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    }
];

export default new web3.eth.Contract(abi, address);
