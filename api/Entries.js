import * as routes from "../constants/Routes";

export async function getAll() {
    const response = await fetch(routes.api + "/entries");
    const entries = response.json();
    
    return entries;
}

export async function get(id) {
    const response = await fetch(routes.api + "/entry/" + id);
    const entry = response.json();
    
    return entry;
}