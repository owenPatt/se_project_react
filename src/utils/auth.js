// Function for user registration
export const signup = async (name, avatar, email, password) => {
  const response = await fetch("/signup", {
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
    // Registration failed
    throw new Error("Registration failed");
  }
};

// Function for user authorization
export const signin = async (email, password) => {
  const response = await fetch("/signin", {
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
    throw new Error("Authorization failed");
  }
};
