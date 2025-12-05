import { combine } from "zustand/middleware"
import { create } from "zustand"

import { useGlobalStore } from "./z-store/global"
import { useUserStore } from "./z-store/user"

const useStore = create(combine(useGlobalStore, useUserStore))

export default useStore
