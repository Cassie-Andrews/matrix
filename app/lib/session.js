const sessionOptions = {
    password: process.env.IRON_PASS,
    cookieName: "matrix-session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export default sessionOptions;