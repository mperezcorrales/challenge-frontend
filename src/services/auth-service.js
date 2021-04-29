export const authenticateUser = async (user, password) => {
    return {validLogin: user && password};
};