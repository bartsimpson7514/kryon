import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface WorkloadsState {
  selectedCategoryId: string
  txnStatus: "idle" | "processing" | "success" | "error"
  searchStatus: {
    isSearching: boolean
    searchedList: []
    searchKey: string
  }
}

const initialState = {
  selectedCategoryId: "",
  txnStatus: "idle",
  searchStatus: {
    isSearching: false,
    searchedList: [],
    searchKey: "",
  },
} satisfies WorkloadsState as unknown as WorkloadsState

interface CategoryAction {
  categoryId: string
}
interface SearchHandlerAction {
  isSearching: boolean
  searchKey: string
  searchedList: []
}
const workloadsState = createSlice({
  name: "workloadsState",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<CategoryAction>) => {
      return {
        ...state,
        selectedCategoryId: action.payload.categoryId,
      }
    },
    setTransactionStatus: (
      state,
      action: PayloadAction<"idle" | "processing" | "success" | "error">,
    ) => {
      return {
        ...state,
        txnStatus: action.payload,
      }
    },
    resetSearchStatus: (state) => {
      state.searchStatus = {
        isSearching: false,
        searchedList: [],
        searchKey: "",
      }
    },
    searchHandlerAction: (
      state,
      action: PayloadAction<SearchHandlerAction>,
    ) => {
      state.searchStatus = {
        ...action.payload,
      }
    },
  },
})

export const {
  setCategoryId,
  setTransactionStatus,
  searchHandlerAction,
  resetSearchStatus,
} = workloadsState.actions
export default workloadsState.reducer
