const CartUtils = {
    add(item, items) {
        let updated = false;
        let ret = items.map(
            i => {
                if (i.id == item.id) {
                    i.quantity++;
                    updated = true;
                }
                return i;
            }
        );

        if (!updated) {
            ret.push({
                id: item.id,
                quantity: 1,
                title: item.title,
                image_url: item.image_url,
                price: item.price
            });
        }
        return ret;
    },

    remove(item, items) {
        let ret_items = items.reduce(
            (ret, i) => {
                if (i.id === item.id) {
                    i.quantity--;
                    if (i.quantity > 0) {
                        ret.push(i)
                    }
                } else {
                    ret.push(i)
                }
                return ret;
            }, []
        );
        return ret_items;
    },

    toJson(items) {
        return JSON.stringify(items.map(i => {
            return {item_id: i.id, quantity: i.quantity}
        }));
    }
}

export default CartUtils
