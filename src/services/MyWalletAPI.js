import axios from "axios";

const BASE_URL = "http://localhost:5000";

function postClient(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);

  return promise;
}

function postLogIn(body) {
  const promise = axios.post(`${BASE_URL}/`, body);

  return promise;
}

function getUserData(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = axios.get(`${BASE_URL}/my-wallet`, config);
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

export { postClient, postLogIn, getUserData, deleteSession };
