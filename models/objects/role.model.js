module.exports = {
  User: {
    name: "user",
    permission: 0,
    isAccepted: true
  },
  Advertiser: {
      name: "advertiser",
      permission: 5,
      isAccepted: false
  },
  Admin: {
    name: "admin",
    permission: 10,
    isAccepted: false
  },
  SuperAdmin: {
    name: "superAdmin",
    permission: 1000,
    isAccepted: true
  }
};
