export default function (state = {items: [], token: null, profile: {}}, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return {items: action.payload, token: state.token, profile: state.profile};
        case "UPDATE_TOKEN":
            return {items: state.items, token: action.payload, profile: state.profile};
        case "UPDATE_PROFILE":
            return {items: state.items, token: state.token, profile: action.payload};
        default:
            return state;
    }
}
