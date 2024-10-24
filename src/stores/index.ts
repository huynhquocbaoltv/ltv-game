import { defineStore } from "pinia";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../firebase";

export interface LtvGameState {
  rooms: Record<string, any>;
  user: Record<string, any>;
  game: Record<string, any>;
}

export const useLtvGameStore = defineStore("LtvGame", {
  state: (): LtvGameState => ({
    rooms: {},
    user: {
      id: "",
      name: "",
      room: "",
      location: "",
      oldLocation: "",
      live: false,
      shield: false,
      energy: 0,
      shoot: "",
      run: "",
    },
    game: {
      step: 0,
      time: 15,
    },
  }),
  actions: {
    setLtvGame(room: string) {
      onValue(dbRef(db, "rooms/" + room + "/"), (snapshot) => {
        const data = snapshot.val();
        this.rooms = data;
      });
      onValue(dbRef(db, "games/" + room), (snapshot) => {
        const data = snapshot.val();
        this.game = data;
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
        console.log(data);
        this.setLtvGame(data.room);
      });
    },
  },
});
