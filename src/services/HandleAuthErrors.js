const HandleAuthErrorMessages = (code) => {
    switch (code.code) {
        case 'auth/invalid-email':
            return "Invalid email.";
        case 'auth/wrong-password':
            return "Invalid password";
        case 'auth/weak-password':
            return "Password need to be atleast 6 characters";
        default:
            return "Error on our part, try again later.";
    }

}
export default HandleAuthErrorMessages;