# Vatcher is vatching U

the new file/graph explorer generation

```
https://github.com/scenaristeur/vatch.git
cd vatch
npm install
node .
// explore on http://localhost:3000
```


- manipulation with vis/vuejs https://github.com/Thomaash/me/blob/release/src/components/Vis.vue

# viewer odt/pdf
- https://viewerjs.org/instructions/

# image through socket.io
- https://codebaker.in/socket-send-image-chat-socket-using-nodejs/

# niem
- The National Information Exchange Model (NIEM) is a community-driven, common vocabulary

http://niem.github.io/

# exemple of Solid profile/card#me in jsonld
```
{
  "nodes": [
    {
      "id": "#jhgfj",
      "x": -64.98412338758106,
      "y": -97.72487384665749,
      "label": "blankroot",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "props": [],
      "built": true
    },
    {
      "id": "#blankroot",
      "label": "blankroot",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#http://schema.org/Person",
      "label": "http://schema.org/Person",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#http://xmlns.com/foaf/0.1/Person",
      "label": "http://xmlns.com/foaf/0.1/Person",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#:me",
      "label": ":me",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#Spoggy_Test_9",
      "label": "Spoggy Test 9",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#<Gilloux.jpg>",
      "label": "<Gilloux.jpg>",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#Smag0\"",
      "label": "Smag0\"",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#test_for_Decentralized_Apps",
      "label": "test for Decentralized Apps",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#",
      "label": "",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#inbox:",
      "label": "inbox:",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#</settings/prefs.ttl>",
      "label": "</settings/prefs.ttl>",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#spo:",
      "label": "spo:",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#</settings/privateTypeIndex.ttl>",
      "label": "</settings/privateTypeIndex.ttl>",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#</settings/publicTypeIndex.ttl>",
      "label": "</settings/publicTypeIndex.ttl>",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#c:me,",
      "label": "c:me,",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#spoggy-test9\"",
      "label": "spoggy-test9\"",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "built": true
    },
    {
      "id": "#pro:card",
      "x": -291.4800261181189,
      "y": -196.88010585383267,
      "label": "pro:card",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "props": [],
      "built": true
    },
    {
      "id": "#n0:PersonalProfileDocument",
      "x": -410.7839427742418,
      "y": -244.29576503767638,
      "label": "n0:PersonalProfileDocument",
      "color": {
        "background": "#D2E5FF",
        "border": "#2B7CE9"
      },
      "shape": "ellipse",
      "props": [],
      "built": true
    }
  ],
  "edges": [
    {
      "from": "#blankroot",
      "to": "#http://schema.org/Person",
      "label": "a",
      "id": "da493570-0415-4cd0-b32b-efda835da4f9"
    },
    {
      "from": "#blankroot",
      "to": "#http://xmlns.com/foaf/0.1/Person",
      "label": "a",
      "id": "34d1027e-36ea-495c-a40a-2ec5ddbd777f"
    },
    {
      "from": "#:me",
      "to": "#http://xmlns.com/foaf/0.1/Person",
      "label": "a",
      "id": "acdabf2a-31fa-4e2f-a12f-de17aada2b75"
    },
    {
      "from": "#:me",
      "to": "#http://schema.org/Person",
      "label": "a",
      "id": "900d41d4-8cab-4dd1-9902-189c540eaac6"
    },
    {
      "from": "#:me",
      "to": "#Spoggy_Test_9",
      "label": "http://www.w3.org/2006/vcard/ns#fn",
      "id": "04b65af9-df88-4674-b067-c726fe4e4a95"
    },
    {
      "from": "#:me",
      "to": "#<Gilloux.jpg>",
      "label": "http://www.w3.org/2006/vcard/ns#hasPhoto",
      "id": "a56ea130-ea31-40e8-b934-ae423517d632"
    },
    {
      "from": "#:me",
      "to": "#Smag0\"",
      "label": "organization-name",
      "id": "ea6d595a-9960-4225-ab8d-754e290469f1"
    },
    {
      "from": "#:me",
      "to": "#Smag0\"",
      "label": "n:organization-name",
      "id": "5a6aa70f-60f6-4106-8099-5e28e4080495"
    },
    {
      "from": "#:me",
      "to": "#test_for_Decentralized_Apps",
      "label": "n:role",
      "id": "9ead45b1-e907-49e9-a1cc-4863e05d675e"
    },
    {
      "from": "#:me",
      "to": "#",
      "label": "n1:trustedApp",
      "id": "6be9b982-3d9f-4efe-a24d-ac6f2968a2ed"
    },
    {
      "from": "#:me",
      "to": "#inbox:",
      "label": "ldp:inbox",
      "id": "88352055-1b09-4f20-ab03-008232664947"
    },
    {
      "from": "#:me",
      "to": "#</settings/prefs.ttl>",
      "label": "sp:preferencesFile",
      "id": "a77c3a8c-d08c-4f6b-aeab-3fc7ee3ac88b"
    },
    {
      "from": "#:me",
      "to": "#spo:",
      "label": "sp:storage",
      "id": "cd64131e-2d7c-4a73-b883-ef450b135479"
    },
    {
      "from": "#:me",
      "to": "#spo:",
      "label": "solid:account",
      "id": "53171eaa-cb5e-4c7d-a000-761a72b9a841"
    },
    {
      "from": "#:me",
      "to": "#</settings/privateTypeIndex.ttl>",
      "label": "solid:privateTypeIndex",
      "id": "5d93d6db-b224-4c9d-8162-64e6e24c0031"
    },
    {
      "from": "#:me",
      "to": "#</settings/publicTypeIndex.ttl>",
      "label": "solid:publicTypeIndex",
      "id": "7d451a4d-001d-4d4c-96ee-04de04c45ce5"
    },
    {
      "from": "#:me",
      "to": "#c:me,",
      "label": "n0:knows",
      "id": "fb2292d1-af4f-48ed-89b4-6b1e83b417d1"
    },
    {
      "from": "#:me",
      "to": "#spoggy-test9\"",
      "label": "n0:name",
      "id": "9f41fb9d-fd94-4cc5-bf50-0c6cd0184d1d"
    },
    {
      "from": "#pro:card",
      "to": "#n0:PersonalProfileDocument",
      "label": "a",
      "id": "5806d7c0-aee5-4617-8bfe-9e179b56d1c3"
    },
    {
      "from": "#pro:card",
      "to": "#:me",
      "label": "n0:maker",
      "id": "1ae50308-e2d9-48dc-b9e1-ebf049ccc4bf"
    },
    {
      "from": "#pro:card",
      "to": "#:me",
      "label": "n0:primaryTopic",
      "id": "bd0c8975-0f22-4b3c-94e2-4c96a91134a5"
    }
  ],
  "@context": {
    "id": "@id",
    "type": "@type",
    "vis": "https://visjs.github.io/vis-network/docs/network/",
    "nodes": "vis:nodes",
    "edges": "vis:edges",
    "color": "vis:color",
    "background": "vis:nodes#color/background",
    "border": "vis:nodes#color/border",
    "shape": "vis:nodes/shape",
    "from": {
      "@id": "vis:edges#from",
      "@type": "@id"
    },
    "to": {
      "@id": "vis:edges#to",
      "@type": "@id"
    },
    "terms": "http://purl.org/dc/terms/",
    "created": "terms:created",
    "creator": "terms:creator",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "label": "rdfs:label",
    "motifs": "http://purl.org/net/wf-motifs#",
    "ipgs": "https://scenaristeur.github.io/ipgs#",
    "solid": "http://www.w3.org/ns/solid/terms#,
    "pro": "./",
    "n0": "http://xmlns.com/foaf/0.1/",
    "schem": "http://schema.org/",
    "n": "http://www.w3.org/2006/vcard/ns#",
    "n1": "http://www.w3.org/ns/auth/acl#",
    "ldp": "http://www.w3.org/ns/ldp#",
    "inbox": "/inbox/",
    "sp": "http://www.w3.org/ns/pim/space#",
    "spo": "/",
    "c": "https://spoggy-test.solidcommunity.net/profile/card#",
    "c0": "https://spoggy-test2.solidcommunity.net/profile/card#",
    "c1": "https://spoggy-test3.solidcommunity.net/profile/card#",
    "c2": "https://spoggy-test4.solidcommunity.net/profile/card#",
    "c3": "https://spoggy-test5.solidcommunity.net/profile/card#",
    "c4": "https://spoggy-test6.solidcommunity.net/profile/card#",
    "c5": "https://spoggy-test7.solidcommunity.net/profile/card#",
    "c6": "https://spoggy-test8.solidcommunity.net/profile/card#",
    "@base": "#"
  },
  "type": "vis"
}


```
