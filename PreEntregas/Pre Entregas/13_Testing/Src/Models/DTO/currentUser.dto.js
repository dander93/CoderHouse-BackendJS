export default class CurrentUser {
    constructor(firstName, lastName, role, mail) {
        this.fullName = `${firstName} ${lastName}`;
        this.role = role;
        this.mail = mail;
    }
}