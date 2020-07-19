export default function (state = {items: [], token: null, profile: {}}, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return {...state, items: action.payload};
        case "UPDATE_TOKEN":
            return {...state, token: action.payload};
        case "UPDATE_PROFILE":
            return {...state, profile: action.payload};
        default:
            return state;
    }
}
