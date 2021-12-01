class Image {
  constructor(base64, url, description, type){
    this.base64 = base64;
    this.url = url;
    this.description = description;
    this.type = type;
  }
}

module.exports = Image;
