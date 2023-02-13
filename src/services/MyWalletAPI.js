import axios from "axios";

const BASE_URL = "https://my-wallet-backend.herokuapp.com";

function createClient(body) {
  const promise = axios.post(`${BASE_URL}/clients`, body);

  return promise;
}

function getUserData(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.get(`${BASE_URL}/clients`, config);
  return promise;
}

function openClientSession(body) {
  const promise = axios.post(`${BASE_URL}/sessions`, body);

  return promise;
}

function deleteSession(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.delete(`${BASE_URL}/sessions`, config);
  return promise;
}

function insertNewTransaction({ inputData, token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.post(`${BASE_URL}/wallet`, inputData, config);
  return promise;
}

function getClientStatments(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.get(`${BASE_URL}/wallet`, config);
  return promise;
}

export {
  createClient,
  openClientSession,
  getUserData,
  deleteSession,
  insertNewTransaction,
  getClientStatments,
};
