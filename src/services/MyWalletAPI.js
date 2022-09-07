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

export { postClient, postLogIn };
