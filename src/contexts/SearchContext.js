import { createContext, useContext } from 'react';

export const SearchContext = createContext();

export function useSearch(){
    return useContext(SearchContext);
}



// export function SearchProvider({ children }) {


//     const value={
//         searchItem:()=>{}
//     }
//     return (
//         <SearchContext.Provider value={value}>
//             {children}
//         </SearchContext.Provider>
//     )
// }

