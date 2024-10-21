import { defineStore } from "pinia";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  DatabaseReference,
} from "firebase/database";
import { db } from "../firebase";

export interface LtvGameState {
  rooms: Record<string, any>;
  user: Record<string, any>;
}

export const useLtvGameStore = defineStore("LtvGame", {
  state: (): LtvGameState => ({
    rooms: {},
    user: {
      id: "",
      username: "",
      room: "",
    },
  }),
  actions: {
    setLtvGame(room: string) {
      onValue(dbRef(db, "rooms/" + room + "/"), (snapshot) => {
        const data = snapshot.val();
        this.rooms = data;
      });
    },
    setUser() {
      const id = localStorage.getItem("ltv-g-u-id");
      if (!id) {
        return;
      }
      this.user.id = id;
      onValue(dbRef(db, "users/" + id), (snapshot) => {
        const data = snapshot.val();
        this.user = {
          id,
          ...data,
        };
        this.setLtvGame(data.room);
      });
    },
  },
});
