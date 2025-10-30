/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/open_quanta.json`.
 */
export type OpenQuanta = {
  "address": "5WzLQxJCSMZb5E4tTLHyzWFQY2UXGUaTqLN6S6kocjCV",
  "metadata": {
    "name": "openQuanta",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCollection",
      "discriminator": [
        156,
        251,
        92,
        54,
        233,
        2,
        16,
        82
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "admins",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  105,
                  115,
                  116,
                  114,
                  97,
                  116,
                  111,
                  114,
                  115
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "collectionRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeAdmins",
      "discriminator": [
        139,
        37,
        215,
        143,
        116,
        5,
        134,
        60
      ],
      "accounts": [
        {
          "name": "deployer",
          "writable": true,
          "signer": true
        },
        {
          "name": "admins",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  105,
                  115,
                  116,
                  114,
                  97,
                  116,
                  111,
                  114,
                  115
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "admins",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    },
    {
      "name": "initializeAuthorProfile",
      "discriminator": [
        40,
        176,
        140,
        71,
        170,
        17,
        182,
        128
      ],
      "accounts": [
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "author"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "profileUri",
          "type": "string"
        },
        {
          "name": "fieldOfStudy",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeCollectionRegistry",
      "discriminator": [
        67,
        46,
        195,
        231,
        11,
        87,
        70,
        204
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "admins",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  105,
                  115,
                  116,
                  114,
                  97,
                  116,
                  111,
                  114,
                  115
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "collectionRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "oqNftMintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97,
                  95,
                  78,
                  102,
                  116,
                  95,
                  77,
                  105,
                  110,
                  116,
                  95,
                  65,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializePaperId",
      "discriminator": [
        168,
        84,
        215,
        65,
        169,
        157,
        124,
        89
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "admins",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  105,
                  115,
                  116,
                  114,
                  97,
                  116,
                  111,
                  114,
                  115
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "paperIdAssigner",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  95,
                  105,
                  100,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "oqNftMintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97,
                  95,
                  78,
                  102,
                  116,
                  95,
                  77,
                  105,
                  110,
                  116,
                  95,
                  65,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeReviewerProfile",
      "discriminator": [
        179,
        209,
        155,
        180,
        225,
        186,
        152,
        110
      ],
      "accounts": [
        {
          "name": "reviewer",
          "writable": true,
          "signer": true
        },
        {
          "name": "reviewerProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  118,
                  105,
                  101,
                  119,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "reviewer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "reviewerProfileUri",
          "type": "string"
        },
        {
          "name": "fieldOfStudy",
          "type": "string"
        }
      ]
    },
    {
      "name": "submitPaper",
      "discriminator": [
        50,
        4,
        72,
        165,
        234,
        253,
        22,
        113
      ],
      "accounts": [
        {
          "name": "paperSubmitter",
          "writable": true,
          "signer": true
        },
        {
          "name": "paperIdAssigner",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  95,
                  105,
                  100,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "authorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "paperSubmitter"
              }
            ]
          }
        },
        {
          "name": "researchPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paperSubmitter"
              },
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  97,
                  116,
                  33,
                  32,
                  40,
                  34,
                  79,
                  81,
                  45,
                  123,
                  58,
                  48,
                  55,
                  125,
                  34,
                  44,
                  32,
                  112,
                  97,
                  112,
                  101,
                  114,
                  95,
                  105,
                  100,
                  95,
                  97,
                  115,
                  115,
                  105,
                  103,
                  110,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "collectionRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "collection",
          "writable": true,
          "optional": true
        },
        {
          "name": "oqNftMintAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  112,
                  101,
                  110,
                  81,
                  117,
                  97,
                  110,
                  116,
                  97,
                  95,
                  78,
                  102,
                  116,
                  95,
                  77,
                  105,
                  110,
                  116,
                  95,
                  65,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "nftAsset",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "paperArgs",
          "type": {
            "defined": {
              "name": "paperArgs"
            }
          }
        },
        {
          "name": "paperSubOwners",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "administrators",
      "discriminator": [
        231,
        25,
        174,
        2,
        27,
        128,
        234,
        183
      ]
    },
    {
      "name": "authorProfile",
      "discriminator": [
        213,
        216,
        229,
        110,
        116,
        224,
        143,
        196
      ]
    },
    {
      "name": "baseCollectionV1",
      "discriminator": [
        5
      ]
    },
    {
      "name": "collectionRegistry",
      "discriminator": [
        103,
        157,
        231,
        9,
        181,
        43,
        15,
        106
      ]
    },
    {
      "name": "paper",
      "discriminator": [
        23,
        208,
        255,
        36,
        198,
        93,
        63,
        12
      ]
    },
    {
      "name": "paperIdCounter",
      "discriminator": [
        18,
        200,
        153,
        178,
        248,
        204,
        213,
        23
      ]
    },
    {
      "name": "reviewerProfile",
      "discriminator": [
        12,
        150,
        47,
        35,
        226,
        155,
        113,
        164
      ]
    }
  ],
  "events": [
    {
      "name": "paperSubmission",
      "discriminator": [
        165,
        36,
        146,
        109,
        32,
        101,
        193,
        34
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "onlyAdmin",
      "msg": "Privileged Instruction: Callable By Admin Only"
    },
    {
      "code": 6001,
      "name": "invalidCollection",
      "msg": "Collection Do Not Belong To OpenQuanta"
    }
  ],
  "types": [
    {
      "name": "administrators",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminsPubkey",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "adminsBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "authorProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authorPubkey",
            "type": "pubkey"
          },
          {
            "name": "authorBump",
            "type": "u8"
          },
          {
            "name": "authorProfileUri",
            "type": "string"
          },
          {
            "name": "reputationScore",
            "type": "u8"
          },
          {
            "name": "authorFieldOfStudy",
            "type": "string"
          },
          {
            "name": "numberOfSubmittedPapers",
            "type": "u16"
          },
          {
            "name": "joinedAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "baseCollectionV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": {
              "defined": {
                "name": "key"
              }
            }
          },
          {
            "name": "updateAuthority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "numMinted",
            "type": "u32"
          },
          {
            "name": "currentSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "collectionEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionAddress",
            "type": "pubkey"
          },
          {
            "name": "collectionName",
            "type": "string"
          },
          {
            "name": "collectionUri",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "createdBy",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "collectionRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "registryBump",
            "type": "u8"
          },
          {
            "name": "totalCollections",
            "type": "u64"
          },
          {
            "name": "mintAuthority",
            "type": "pubkey"
          },
          {
            "name": "collectionMints",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "collectionEntries",
            "type": {
              "vec": {
                "defined": {
                  "name": "collectionEntry"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "key",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "uninitialized"
          },
          {
            "name": "assetV1"
          },
          {
            "name": "hashedAssetV1"
          },
          {
            "name": "pluginHeaderV1"
          },
          {
            "name": "pluginRegistryV1"
          },
          {
            "name": "collectionV1"
          }
        ]
      }
    },
    {
      "name": "paper",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerOfPaper",
            "type": "pubkey"
          },
          {
            "name": "researchSubOwners",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "titleOfPaper",
            "type": "string"
          },
          {
            "name": "fieldOfResearch",
            "type": "string"
          },
          {
            "name": "arweaveHashToPaper",
            "type": "string"
          },
          {
            "name": "openQuantaPaperId",
            "type": "string"
          },
          {
            "name": "paperVersion",
            "type": "u8"
          },
          {
            "name": "timeOfSubmission",
            "type": "i64"
          },
          {
            "name": "nftAddressForPaper",
            "type": "pubkey"
          },
          {
            "name": "paperBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "paperArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "titleOfPaper",
            "type": "string"
          },
          {
            "name": "paperArweaveHash",
            "type": "string"
          },
          {
            "name": "fieldOfResearch",
            "type": "string"
          },
          {
            "name": "paperVersion",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "paperIdCounter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentId",
            "type": "u64"
          },
          {
            "name": "counterBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "paperSubmission",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paperSubmitter",
            "type": "pubkey"
          },
          {
            "name": "paperId",
            "type": "string"
          },
          {
            "name": "titleOfPaper",
            "type": "string"
          },
          {
            "name": "timeOfSubmission",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "reviewerProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reviewerPubkey",
            "type": "pubkey"
          },
          {
            "name": "reviewerBump",
            "type": "u8"
          },
          {
            "name": "reviewerProfileUri",
            "type": "string"
          },
          {
            "name": "reputationScore",
            "type": "u8"
          },
          {
            "name": "reviewerFieldOfStudy",
            "type": "string"
          },
          {
            "name": "joinedAt",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
