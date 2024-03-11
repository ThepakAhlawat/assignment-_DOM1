import { createContext,useState } from "react";

export const TextContext=createContext()

function TextContextProvider({children}){
    const[textOption,setTextOption]=useState(false)

    const[homeProducts,setHomeProducts]=useState('')

    return(
        <TextContext.Provider value={{setTextOption,textOption,homeProducts,setHomeProducts}}>{children}</TextContext.Provider>
    )

}
export default TextContextProvider