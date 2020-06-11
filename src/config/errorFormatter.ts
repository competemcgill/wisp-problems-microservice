const errorMessage = ({ location, msg, param }) => {
    return {
        status: 422,
        message: `${location}[${param}]: ${msg}`
    };
};

export { errorMessage };
