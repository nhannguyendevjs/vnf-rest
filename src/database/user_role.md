db.user_role.insertMany([
  {
    "name" : "owner",
    "displayName" : "Owner",
    "backgroundColor" : "#ba000d",
    "textColor" : "#ffffff",
    "priority" : 0
  },
  {
    "name" : "manager",
    "displayName" : "Manager",
    "backgroundColor" : "#ba000d",
    "textColor" : "#ffffff",
    "priority" : 1
  },
  {
    "name" : "leader",
    "displayName" : "Leader",
    "backgroundColor" : "#0069c0",
    "textColor" : "#ffffff",
    "priority" : 2
  },
  {
    "name" : "member",
    "displayName" : "Member",
    "backgroundColor" : "#546e7a",
    "textColor" : "#ffffff",
    "priority" : 3  
  },
  {
    "name" : "collaborator",
    "displayName" : "Collaborator",
    "backgroundColor" : "#0069c0",
    "textColor" : "#ffffff",
    "priority" : 4
  }
])
