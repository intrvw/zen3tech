import { combineReducers } from 'redux'
import GallerySlice from './GallerySlice'

const RootReducer=combineReducers({
    GalleryReducer:GallerySlice
})

export default RootReducer