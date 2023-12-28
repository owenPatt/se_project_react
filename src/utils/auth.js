const baseUrl = "http://localhost:3001";

// Function for user registration
export const signup = async (name, avatar, email, password) => {
  const response = await fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });

  if (response.ok) {
    // Registration successful
    const data = await response.json();
    return data;
  } else {
    // Authorization failed
    const error = await response.json();
    throw new Error(error.message);
  }
};

// Function for user authorization
export const signin = async (email, password) => {
  const response = await fetch(baseUrl + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    // Authorization successful
    const data = await response.json();
    return data;
  } else {
    // Authorization failed
    const error = await response.json();
    throw new Error(error.message);
  }
};

// Function to check token validity
export const checkToken = async (token) => {
  const response = await fetch(baseUrl + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return { name: data.name, avatar: data.avatar, email: data.email };
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};
