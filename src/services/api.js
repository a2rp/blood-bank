import {
    loadDonors,
    saveDonors,
    loadMessages,
    saveMessages,
} from "./storage.js";
import { seedDonors } from "../data/seed.js";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function ensureSeed() {
    const donors = loadDonors();
    if (!donors.length) {
        saveDonors(seedDonors);
        return seedDonors;
    }
    return donors;
}

export async function getStats() {
    await delay(200);
    const donors = ensureSeed();
    const total = donors.length;
    const available = donors.filter((d) => d.available).length;
    const groups = donors.reduce((acc, d) => {
        acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
        return acc;
    }, {});
    return { total, available, groups };
}

export async function listDonors({
    q = "",
    bloodGroup = "ALL",
    city = "",
    available = "ALL",
} = {}) {
    await delay(250);
    const donors = ensureSeed();
    const qq = q.trim().toLowerCase();
    return donors.filter((d) => {
        const okQ =
            !qq ||
            [d.name, d.phone, d.email, d.city, d.bloodGroup].some((x) =>
                String(x).toLowerCase().includes(qq)
            );
        const okG = bloodGroup === "ALL" || d.bloodGroup === bloodGroup;
        const okC = !city || d.city.toLowerCase().includes(city.toLowerCase());
        const okA =
            available === "ALL" || d.available === (available === "YES");
        return okQ && okG && okC && okA;
    });
}

export async function createDonor(payload) {
    await delay(300);
    const donors = ensureSeed();
    const id = Math.random().toString(36).slice(2);
    const next = [{ ...payload, id }, ...donors];
    saveDonors(next);
    return { id, ...payload };
}

export async function sendMessage(payload) {
    await delay(300);
    const msgs = loadMessages();
    const id = Math.random().toString(36).slice(2);
    const next = [{ id, at: new Date().toISOString(), ...payload }, ...msgs];
    saveMessages(next);
    return { ok: true, id };
}

export async function listMessages() {
    await delay(200);
    return loadMessages();
}

export async function deleteMessage(id) {
    await delay(150);
    const msgs = loadMessages().filter((m) => m.id !== id);
    saveMessages(msgs);
    return { ok: true };
}

export async function clearAllMessages() {
    await delay(150);
    saveMessages([]);
    return { ok: true };
}

export async function getDonor(id) {
    await delay(150);
    const donors = loadDonors();
    return donors.find((d) => d.id === id) || null;
}

export async function updateDonor(id, patch) {
    await delay(300);
    const donors = loadDonors();
    const idx = donors.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error("Donor not found");
    const next = { ...donors[idx], ...patch };
    donors[idx] = next;
    saveDonors(donors);
    return next;
}
