import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    workspace: "fairytale-bias-val-split",
    document: "storybook_sentence_val_split-assipattle_and_the_mester_stoorworm",
    elements: [],
    categories: [],
    rules: null,
    combinedRules: null,
    curCategory: null,
    scores: null,
    combinedPatterns: [],
    ready: false
}

export const clearAnnotation = createAsyncThunk('workspace/clear', async (request, { getState }) => {

    const state = getState()

    var url = new URL(`http://35.223.89.10:8080/clear`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})

export const fetchElements = createAsyncThunk('workspace/fetchElements', async (request, { getState }) => {

    const state = getState()

    var url = new URL(`http://35.223.89.10:8080/dataset`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const setLabel = createAsyncThunk('workspace/send_labeling', async (request, { getState }) => {
    const state = getState()

    const { element_id, label } = request

    var url = new URL(`http://35.223.89.10:8080/label/${element_id}/${label}`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data

})

export const fetchCategories = createAsyncThunk('workspace/get_all_categories', async (request, { getState }) => {

    const state = getState()

    var url = new URL(`https://sleuth-ui-backend-dev.ris2-debater-event.us-east.containers.appdomain.cloud/workspace/${state.workspace.workspace}/categories`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Via95malVX383mcS022JfIKAksd9admCVJASD94123FPQva943q'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const fetchIndividualRules = createAsyncThunk('workspace/fetch_rules', async (request, {getState}) => {

    const state = getState()

    var url = new URL(`http://35.223.89.10:8080/patterns`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const fetchCombinedRules = createAsyncThunk('workspace/fetch_combined_rules', async (request, {getState}) => {

    const state = getState()

    var url = new URL(`http://35.223.89.10:8080/combinedpatterns`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const setElementLabel = createAsyncThunk('workspace/set_element_label', async (request, { getState }) => {

    const state = getState()

    const { element_id, label } = request

    console.log(`element id: ${element_id}, label: ${label}`)

    var url = new URL(`https://sleuth-ui-backend-dev.ris2-debater-event.us-east.containers.appdomain.cloud/workspace/${state.workspace.workspace}/element/${element_id}?category_name=${state.workspace.curCategory}&value=`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Via95malVX383mcS022JfIKAksd9admCVJASD94123FPQva943q'
        },
        body: JSON.stringify({
            'category_name': state.workspace.curCategory,
            'value': label,
            'update_counter': true
        }),
        method: "PUT"
    }).then( response => response.json())

    return data

})

const DataSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        updateCurCategory(state, action) {
            const c = action.payload
            console.log(`category: ${c}`)
            return {
                ...state,
                curCategory: c
            }
        }
    },
    extraReducers: {
        [fetchElements.fulfilled]: (state, action) => {
            const data = action.payload
            console.log(data)

            return {
                ...state,
                elements: data,
                ready: true
            }
        },
        [fetchCategories.fulfilled]: (state, action) => {
            const data = action.payload
            return {
                ...state,
                categories: data['categories']
            }
        },
        [fetchIndividualRules.fulfilled]: (state, action) => {
            const data = action.payload
            console.log(`fetchRules returned: `, data)
            return {
                ...state,
                rules: data
            }
        },
        [fetchCombinedRules.fulfilled]: (state, action) => {
            var data = action.payload
            var patterns = []
            data.patterns.forEach((r, i) => {
                patterns.push({
                    pattern: r['pattern'],
                    precision: r['precision'].toFixed(2),
                    recall: r['recall'].toFixed(2),
                    fscore: r['fscore'].toFixed(2),
                    weight: data.weights[i].toFixed(2)
                })
            })

            console.log(`patterns before modified`, patterns)

            patterns.sort((a, b) => {
                if ( a['weight'] < b['weight'] ) {
                    return 1
                } else if (a['weight'] > b['weight']) {
                    return -1
                } else {
                    return 0
                }
            })

            console.log(`patterns after modified`, patterns)

            return {
                ...state,
                combinedRules: data,
                combinedPatterns: patterns,
                scores: data['scores']
            }
        },
        [setLabel.fulfilled]: (state, action) => {
            const data = action.payload
            console.log(`setLabel return: `, data)
        }
    }
})

export default DataSlice.reducer;
export const { updateCurCategory } = DataSlice.actions;
