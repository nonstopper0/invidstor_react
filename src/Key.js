export function getKey(key) {
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr)
        } else {
            return null;
        }
    } catch(err) {
        return null;
    }
}

export function storeKey(key, obj) {
    if (!key) {
        console.log('Error: Key is missing');
    } 

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch(err) {
        console.log(err)
    }
}

export function removeKey() {
    try {
        localStorage.removeItem('authtoken')
    } catch(err) {
        console.log(err)
    }
}