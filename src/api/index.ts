import {NET} from '../axios'

export async function getUserData({search,limit}:{search:string,limit:number}){
    const res = await NET("GET",  `/search/users?q=${search}&per_page=${limit}`,{}, '', '', false, false)
    
    return res
}

export async function getUserDataRepository({search}:{search:string}){
    const res = await NET("GET",  `/users/${search}/repos`,{}, '', '', false, false)
    
    return res
}