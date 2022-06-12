const errMessage = "Error in registering user";
const endpoint = "http://localhost:5001"; // THIS CAN BE MOVED TO ENV

export default async (data) => {
  try {
    const response = await fetch(`${endpoint}/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw new Error(errMessage);
  } catch (e) {
    return { mesasge: e?.mesasge };
  }
};
