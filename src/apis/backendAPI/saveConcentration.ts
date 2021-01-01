import axios from 'axios'
import './index'
import { backendAxiosConfig } from './index'
import {SaveConcentrationPost} from './interfaces'

export const saveConcentration=(postData: SaveConcentrationPost)=>{
    return axios.post('/save_concent', postData, backendAxiosConfig)
}