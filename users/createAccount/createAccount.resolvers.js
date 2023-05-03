import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        //check if username or email are already on DB
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        // hash password  1234 -> fn(1234) -> ad$f@s@3423# -> DB  => oneway Fn
        // 니꼬 쌤의 해시함수 설명 영상: https://www.youtube.com/watch?v=67UwxR3ts2E

        const uglyPassword = await bcrypt.hash(password, 10);
        if (existingUser) {
          throw new Error("This username/password is already taken");
        }
        const user = client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        // save and return the user
        return user;
      } catch (e) {
        return e;
      }
    },
  },
};
