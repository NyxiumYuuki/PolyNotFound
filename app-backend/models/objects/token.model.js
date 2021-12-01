class Token {
  constructor(id, email, profileImageUrl, role){
    this.id = id;
    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.role = role;
  }
}

module.exports = Token;
