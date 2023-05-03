import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
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
      const uglyPassword = await bcrypt.hash(password, 10);
      const user = client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      console.log(existingUser);
      return user;

      // hash password  1234 -> fn(1234) -> ad$f@s@3423# -> DB  => oneway Fn
      // 니꼬 쌤의 해시함수 설명 영상: https://www.youtube.com/watch?v=67UwxR3ts2E
      // save and return the user
    },
  },
};
