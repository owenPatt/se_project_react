class ItemApi {
  constructor() {
    this._baseUrl = "http://localhost:3001";
    this._headers = {
      "content-type": "application/json",
    };
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  _request = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  };

  getItems = () => {
    //Gets the initial cards
    return this._request(`${this._baseUrl}/items`, "GET");
  };

  postItem = ({ name, imageUrl, weather }) => {
    return this._request(`${this._baseUrl}/items`, "POST", {
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    });
  };

  deleteItem = ({ _id }) => {
    return this._request(`${this._baseUrl}/items/${_id}`, "DELETE");
  };
}

export default ItemApi;
