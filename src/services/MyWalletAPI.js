import axios from "axios";

const BASE_URL = "http://localhost:5000";

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

function insertNewTransaction(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.post(`${BASE_URL}/wallet`, config);
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
