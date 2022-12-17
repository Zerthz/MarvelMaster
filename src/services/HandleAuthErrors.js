const HandleAuthErrorMessages = (code) => {
    switch (code.code) {
        case 'auth/invalid-email':
            return "Invalid email.";
        case 'auth/wrong-password':
            return "Invalid password";
        default:
            return "Couldn't log you in, try again later.";
    }

}
export default HandleAuthErrorMessages;