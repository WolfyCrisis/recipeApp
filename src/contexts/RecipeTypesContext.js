import React, { useState, useEffect, createContext } from 'react'

import axios from 'axios'

import { XMLParser } from 'fast-xml-parser'

export const RecipeTypesContext = createContext(null)

function RecipeTypesProvider({ children }) {
    const parser = new XMLParser()
    const [types, setTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async() => {
        await fetch('https://gist.githubusercontent.com/WolfyCrisis/75e12135399fa4fda49d2b758d87e5b2/raw/9811feca56a9f2832ae0d92f4179945fa061aba2/recipetypes.xml')
            .then((res) => 
                res.text()
            )
            .then((txtRes) => {
                if (types.length === 0) {
                    let obj = parser.parse(txtRes)
                    obj.recipe.forEach(ele => {
                        setTypes(arr => [...arr, ele.type])
                    })
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const typesDataStore = {
        types: [types, setTypes],
        isLoading: [isLoading, setIsLoading]
    }

    return (
        <RecipeTypesContext.Provider value={typesDataStore}>
            {children}
        </RecipeTypesContext.Provider>
    )
}

export default RecipeTypesProvider