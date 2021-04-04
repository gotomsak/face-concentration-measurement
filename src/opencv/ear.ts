import { difference } from "./difference"


export function ear(eye:any){

    const A = difference(eye[1],eye[5])
    const B = difference(eye[2],eye[4])
    const C = difference(eye[0],eye[3])

    return Math.round(((A+B)/(2.0*C))*1000)/1000
}

export const blinkCount=(leftEye:any,rightEye:any,leftEyeT:any,rightEyeT:any)=>{
    let blinkBool=false
    let blinked = false

    if (rightEye< rightEyeT && leftEye<leftEyeT){
        blinked=true
    }
    return blinked
}