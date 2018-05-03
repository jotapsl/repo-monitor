const storageKey = 'authState';

export const loadAuthState = () => {
    try {
        const authState = localStorage.getItem(storageKey);
        if (authState === null) {
            return undefined;
        }
        return JSON.parse(authState);
    } catch (error) {
        return undefined;
    }
}

export const saveAuthState = (state) => {
    try {
        const authStateString = JSON.stringify(state.auth);
        localStorage.setItem(storageKey, authStateString);
    } catch (error) {
        throw new Error ('Error saving state to localstorage!');
    }
}