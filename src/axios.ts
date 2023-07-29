import axios from 'axios'
 

export const NET = async (tipe:string, url:string, data:object, token:string, pin:string, isMultipart:boolean, isStream:boolean) => {
 
  tipe = (tipe||"GET")
  url = (url||"")
  data = (data||{})
  token = (token||"")
  pin = (pin||"")
  isMultipart = (isMultipart||false)
  isStream = (isStream||false)
  
  let objectResponse = {
    status : true,
    data : {}
  }

  try {
   
    const res = await axios({
      method : tipe,      
      url : ('https://api.github.com'+url),      
      data,
      responseType : (isStream)?"stream":"json",
      headers : {
        'Content-Type' : (isMultipart)?"multipart/form-data; boundary=awek":"application/json",
        // 'Authorization-pin' : pin,
        'X-GitHub-Api-Version':'2022-11-28',
        'Accept':'application/vnd.github+json',
        'Authorization' : 'Bearer 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',        
      }      
    }) 
    objectResponse.status = true
    objectResponse.data = res?.data     
 
  } 
  
  catch (err) {   
    let error:any = err
    if(/401/ig.test(error)){
     alert('Session expired')
    }
    objectResponse.status = false
    objectResponse.data = error?.response?.data    
  }

  return objectResponse

}
 