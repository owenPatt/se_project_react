const baseUrl = "http://localhost:3001";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

// Function for user registration
export const signup = (name, avatar, email, password) => {
  return fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};

// Function for user authorization
export const signin = (email, password) => {
  return fetch(baseUrl + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};

// Function to check token validity
export const checkToken = (token) => {
  return fetch(baseUrl + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return {
        name: data.name,
        avatar: data.avatar,
        email: data.email,
        _id: data._id,
      };
    });
};

// Function to update the user profile
export const updateProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return fetch(baseUrl + "/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then(checkResponse)
    .then((data) => {
      return {
        name: data.name,
        avatar: data.avatar,
        email: data.email,
        _id: data._id,
      };
    });
};
