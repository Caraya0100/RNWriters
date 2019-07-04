import * as routes from "../constants/Routes";

export function getAll() {
    return fetch(routes.api + "/entries").then(response => response.json());
}