import Constants from "expo-constants";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_BASE_URL_V4 = "https://api.themoviedb.org/4";
const API_KEY = Constants.expoConfig.extra.REACT_APP_PRIVATE_API_KEY;

const createRequestOptions = (method, body = null) => ({
  method: method,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: body ? JSON.stringify(body) : null,
});

const fetchFromApi = async (endpoint, version = null) => {
  let fullEndpoint = "";

  if (version === 4) {
    fullEndpoint = `${API_BASE_URL_V4}${endpoint}`;
  } else {
    fullEndpoint = `${API_BASE_URL}${endpoint}`;
  }

  try {
    const response = await fetch(fullEndpoint, createRequestOptions("GET"));
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao realizar o fetch", error);
    throw error;
  }
};

const createRequestToken = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/authentication/token/new`,
      createRequestOptions("GET")
    );
    const result = await response.json();
    if (!result.success) {
      throw new Error("Erro ao criar request token");
    }

    return result.request_token;
  } catch (error) {
    console.error("Erro ao criar request token", error);
    throw error;
  }
};

const validateTokenWithLogin = async (username, password, requestToken) => {
  try {
    const body = {
      username: username,
      password: password,
      request_token: requestToken,
    };
    const response = await fetch(
      `${API_BASE_URL}/authentication/token/validate_with_login`,
      createRequestOptions("POST", body)
    );
    const result = await response.json();
    if (!result.success) {
      throw new Error("Erro ao validar token com login");
    }

    return result.request_token;
  } catch (error) {
    console.error("Erro ao validar token com login", error);
    throw error;
  }
};

const createSessionId = async (requestToken) => {
  try {
    const body = { request_token: requestToken };
    const response = await fetch(
      `${API_BASE_URL}/authentication/session/new`,
      createRequestOptions("POST", body)
    );
    const result = await response.json();
    if (!result.success) {
      throw new Error("Erro ao criar session ID");
    }

    return result.session_id;
  } catch (error) {
    console.error("Erro ao criar session ID", error);
    throw error;
  }
};

const authenticateUserWithLogin = async (username, password) => {
  try {
    const requestToken = await createRequestToken();

    const validatedToken = await validateTokenWithLogin(
      username,
      password,
      requestToken
    );

    const sessionId = await createSessionId(validatedToken);

    console.log("Autenticação completa! Session ID:", sessionId);
    return sessionId;
  } catch (error) {
    console.error("Erro no fluxo de autenticação com login", error);
    throw error;
  }
};

export {
  fetchFromApi,
  createRequestToken,
  validateTokenWithLogin,
  createSessionId,
  authenticateUserWithLogin,
};
