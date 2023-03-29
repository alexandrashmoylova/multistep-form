export const postData = async (user: any) => {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(`Error at the adress ${url}, status code ${res}`);
    }
  } catch (err) {
    throw err;
  }
};
