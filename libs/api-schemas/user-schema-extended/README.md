# User Schema (Extended)
This library is obviously an extended version of the [`User Schema`](../user-schema/) library, which is a library shared by both the front end and the back end. Part of the user schema validation is to make sure the email address and username are unique (i.e. not already registered in the DB), and as such, require prisma - which is not suitable to be accessed from the front end. 

As such, this extended version of the user schema will only be consumed by the back end and will perform additional validation, such as that mentioned above. 