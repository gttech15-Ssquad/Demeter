import Cookie from "js-cookie";

import { createPersistMiddleware } from "../middleware/persist";
import { userProps } from "@/src/types/user";

interface UserStore {
  user: userProps | null;
  isAuthenticated: boolean;
  signIn: (user: userProps) => void;
  signOut: () => void;
  expiresAt: number | null; // timestamp for expiry
  sessionTimer: ReturnType<typeof setTimeout> | null;
  handleSessionExpired: () => void;
}

const initialState: UserStore = {
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  expiresAt: null,
  sessionTimer: null,
  handleSessionExpired: () => {},
};

export const useUserStore = createPersistMiddleware<UserStore>(
  "needs-user",
  (set, _get, _store) => ({
    ...initialState,
    signIn: (user) => {
      const expiresAt = Date.now() + 1000 * 60 * 55 * 1;
      set(() => ({ user, isAuthenticated: true, expiresAt }));
      Cookie.set("VIRTUPAY_USER_TOKEN", user.accessToken, {
        sameSite: "Lax",
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(expiresAt),
      });
    },

    signOut: () => {
      const { sessionTimer } = _get();
      if (sessionTimer) clearTimeout(sessionTimer);

      set({
        user: null,
        isAuthenticated: false,
        expiresAt: null,
        sessionTimer: null,
      });
      localStorage.removeItem("needs-user");
      Cookie.remove("VIRTUPAY_USER_TOKEN");
    },
  })
);

// export const useUserStorewer = createPersistMiddleware<UserStore>(
//   "user",
//   (set, get, _store) => ({
//     ...initialState,

//     signIn: (user) => {
//       const expiresAt = Date.now() + 1000 * 60 * 60 * 3; // 3hr

//       set(() => ({ user, isAuthenticated: true, expiresAt }));

//       Cookie.set("TOKEN", user.access_token, {
//         sameSite: "Lax",
//         secure: process.env.NODE_ENV !== "development",
//         expires: new Date(expiresAt),
//       });

//       // schedule expiry
//       const timer = setTimeout(() => {
//         get().handleSessionExpired();
//       }, expiresAt - Date.now());

//       // stash timer id in state if you want to clear it on signOut
//       set(() => ({ sessionTimer: timer }));
//     },

//     signOut: () => {
//       const { sessionTimer } = get();
//       if (sessionTimer) clearTimeout(sessionTimer);

//       set({ user: null, isAuthenticated: false, expiresAt: null, sessionTimer: null });
//       localStorage.removeItem("user");
//       Cookie.remove("TOKEN");
//     },

//     handleSessionExpired: () => {
//       alert("Your session has expired. Please sign in again.");
//       get().signOut();
//     },
//   })
// );
