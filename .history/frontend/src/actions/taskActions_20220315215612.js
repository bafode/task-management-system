import axios from 'axios'
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_CREATE_REVIEW_REQUEST,
  TASK_CREATE_REVIEW_SUCCESS,
  TASK_CREATE_REVIEW_FAIL,
  TASK_TOP_REQUEST,
  TASK_TOP_SUCCESS,
  TASK_TOP_FAIL,
} from '../constants/taskConstants'
import { logout } from './userActions'

export const listTasks = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/tasks?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTaskDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/tasks/${id}`)

    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/tasks/${id}`, config)

    dispatch({
      type: TASK_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createTask = (name,description,status,priority) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/tasks`, {}, config)

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/tasks/${task._id}`,
      task,
      config
    )

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createTaskReview = (taskId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TASK_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/tasks/${taskId}/reviews`, review, config)

    dispatch({
      type: TASK_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopTasks = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_TOP_REQUEST })

    const { data } = await axios.get(`/api/tasks/top`)

    dispatch({
      type: TASK_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TASK_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
