export default async (data) => {
  try {
    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Error in registering user");
    }
    console.log("status", response.status);
    return response;
  } catch (e) {
    return "Error in registering user";
  }
};
