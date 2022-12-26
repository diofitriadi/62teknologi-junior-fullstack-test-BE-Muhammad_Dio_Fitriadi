import { combineReducers } from "redux"
import Auth from "./Auth"

const rootReducers = combineReducers({
  auth: Auth
})


export default rootReducers