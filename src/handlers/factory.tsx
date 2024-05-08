const createHandlers = <T extends object>(url: string) => {
  const getAllData = async (): Promise<Array<T>> => {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(response);
    }

    const result = await response.json();
    return result;
  };

  const getDataById = async (id: string): Promise<T> => {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      console.error(response);
    }

    const result = await response.json();
    return result;
  };

  const createData = async (data: T): Promise<T> => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(response);
    }

    const result = await response.json();
    return result;
  };

  const updateData = async (data: T, id: string): Promise<T> => {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(response);
    }

    const result = await response.json();
    return result;
  };

  const deleteData = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error(response);
    }

    const result = await response.json();
    return result;
  };

  return {
    getAllData: getAllData,
    getDataById: getDataById,
    createData: createData,
    updateData: updateData,
    deleteData: deleteData,
  };
};

export { createHandlers };
