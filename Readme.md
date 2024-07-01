# Key Management System

Key Management System to be used by Secure Vote for encryption key management.

## Requirements

* Secure Vote
* [MongoDB](https://www.mongodb.com)

## Setup

### MongoDB

Assuming MongoDB is installed, KMS uses a collection for **auth**, **election**, **signature** and **log**.

### .env

Create **.env** file on root folder, following **.env-template** file:

```dotenv
PORT=number of the port
SVM_URI=URI for Secure Vote API
MONGO_URI=URI for MONGODB
JWT_SECRET=secret for JWT token creation and verification
ACCESS_TOKEN=token for system that is authorized to request keys from system
```

**MONGO_URI** contains username and password in it.

**ACCESS_TOKEN** must be created using **JWT_SECRET**.

If **SVM_URI** is empty, KMS will not do anything.

If you choose not to use Secure Vote please change **SVM_URI** with the URI of the application you wish to access KMS.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install addon dependencies.

```bash
npm install
```

## Usage

Use the package manager [npm](https://www.npmjs.com) to start Key Management System.

```bash
npm start
```
