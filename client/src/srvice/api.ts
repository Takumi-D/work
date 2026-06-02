const URL = "http://localhost:5000";

async function get<T>(url: string): Promise<T> {
    const response = await fetch(`${URL}${url}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function post<T, D>(url: string, data: D): Promise<T> {
    const response = await fetch(`${URL}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function getOne(url: string) {
    const response = await fetch(`${URL}${url}`);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

async function put(url: string, data: any) {
    const response = await fetch(`${URL}${url}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

async function del(url: string) {
    const response = await fetch(`${URL}${url}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export { post, get, del, getOne, put };