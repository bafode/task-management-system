import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_CREATE_RESET,
  TASK_CREATE_FAIL,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_REQUEST,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_RESET,
  TASK_CREATE_REVIEW_REQUEST,
  TASK_CREATE_REVIEW_SUCCESS,
  TASK_CREATE_REVIEW_FAIL,
  TASK_CREATE_REVIEW_RESET,
  TASK_TOP_REQUEST,
  TASK_TOP_SUCCESS,
  TASK_TOP_FAIL,
} from '../constants/taskConstants'

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] }
    case TASK_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.taks,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const taskDetailsReducer = (
  state = { task: {} },
  action
) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { ...state, loading: true }
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload }
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true }
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true }
    case TASK_CREATE_SUCCESS:
      return { loading: false, success: true, task: action.payload }
    case TASK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case TASK_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskUpdateReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_UPDATE_REQUEST:
      return { loading: true }
    case TASK_UPDATE_SUCCESS:
      return { loading: false, success: true, task: action.payload }
    case TASK_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TASK_UPDATE_RESET:
      return { task: {} }
    default:
      return state
  }
}

// export const productReviewCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REVIEW_REQUEST:
//       return { loading: true }
//     case PRODUCT_CREATE_REVIEW_SUCCESS:
//       return { loading: false, success: true }
//     case PRODUCT_CREATE_REVIEW_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_CREATE_REVIEW_RESET:
//       return {}
//     default:
//       return state
//   }
// }

// export const productTopRatedReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_TOP_REQUEST:
//       return { loading: true, products: [] }
//     case PRODUCT_TOP_SUCCESS:
//       return { loading: false, products: action.payload }
//     case PRODUCT_TOP_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }
