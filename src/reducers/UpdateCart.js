export default function (state = {items:[]}, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return {items:action.payload};
        default:
            return state;
    }
}
