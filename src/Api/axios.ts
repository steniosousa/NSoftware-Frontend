import axios from "axios"

export class register{
    async post(param:any){
        let responseRequest
        try{
            responseRequest = await axios.post(param)
        }catch (error){
            responseRequest = error
        }
        return responseRequest
    }
}