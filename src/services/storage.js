const KEY = "bb_donors_v1";
const MSG = "bb_messages_v1";

function readList(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function writeList(key, list) {
    try {
        localStorage.setItem(key, JSON.stringify(list));
        return true;
    } catch {
        return false;
    }
}

export function loadDonors() {
    return readList(KEY);
}
export function saveDonors(list) {
    return writeList(KEY, list);
}
export function loadMessages() {
    return readList(MSG);
}
export function saveMessages(list) {
    return writeList(MSG, list);
}
