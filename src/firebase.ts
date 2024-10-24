// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { Player } from "./utils";
const firebaseConfig = {
  apiKey: "AIzaSyAFTa5eAvsZpIs1ezCNlV3Qnl15S6J2DjY",
  authDomain: "ltv-game.firebaseapp.com",
  databaseURL:
    "https://ltv-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ltv-game",
  storageBucket: "ltv-game.appspot.com",
  messagingSenderId: "219059305667",
  appId: "1:219059305667:web:a0a24c9e184d46170f7676",
  measurementId: "G-3ZRZG8WRD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Hàm để ghi dữ liệu người dùng
export async function writeUserData(
  userId: string,
  name: string,
  room: string
) {
  await set(ref(db, "users/" + userId), {
    name: name,
    room,
  });
  return;
}

export async function joinRoom(roomId: string, player: Player) {
  await set(ref(db, "rooms/" + roomId + "/" + player.id), {
    location: player.location,
    name: player.name,
    shoot: "",
    run: "",
    oldLocation: player.location,
    kills: 0,
    live: true,
    shield: false,
    energy: 0,
  });
  return;
}

export async function getRoom(roomId: string) {
  const snapshot = await get(ref(db, "rooms/" + roomId + "/"));
  return snapshot.val();
}

export async function createNewGame(roomId: string) {
  await set(ref(db, "games/" + roomId), {
    status: "waiting",
    step: 0,
    area: {
      x: 1,
      y: 1,
      w: 10,
      h: 10,
    },
  });
  return;
}

export async function updateGame(roomId: string, data: any) {
  // await set(ref(db, "rooms/" + roomId), enemys);
  await set(ref(db, "games/" + roomId), data);
  return;
}

export async function updateRoom(roomId: string, data: any) {
  await set(ref(db, "rooms/" + roomId), data);
  return;
}

export async function actionStep(roomId: string, data: any) {
  await set(ref(db, "rooms/" + roomId + "/" + data.id), data);
  return;
}
