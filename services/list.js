export async function getTodos() {
  console.log("API fetch");
  const data = await fetch("http://localhost:3333/todo");
  return await data.json();
}

export async function setItem(item) {
  console.log("API setITEM");
  console.log(item);

  const data = await fetch("http://localhost:3333/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await data.json();
}

export async function updateItem(id, item) {
  console.log("API Patch");
  const data = await fetch("http://localhost:3333/todo/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await data.json();
}
