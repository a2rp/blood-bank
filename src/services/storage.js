const KEY = "bb_donors_v1";
const MSG = "bb_messages_v1";

export function loadDonors() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) ?? [];
    } catch {
        return [];
    }
}
export function saveDonors(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}
export function loadMessages() {
    try {
        return JSON.parse(localStorage.getItem(MSG)) ?? [];
    } catch {
        return [];
    }
}
export function saveMessages(list) {
    localStorage.setItem(MSG, JSON.stringify(list));
}
