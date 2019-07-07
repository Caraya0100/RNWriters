import * as routes from "../constants/Routes";

export async function getAll() {
    const response = await fetch(routes.api + "/entries");
    const entries = response.json();
    
    return entries;
}