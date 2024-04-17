import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /\S+@\S+\.\S+/,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
      maxlength: 30,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    methods: {
      comparePasswords: async function (candidatePassword) {
        const isCorrectPassword = bcrypt.compare(
          candidatePassword,
          this.password
        );

        return isCorrectPassword;
      },
    },
  }
);

const SALT_FACTORY = 10;

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_FACTORY); // hash
  }
  next();
});

const User = model("User", userSchema);

export default User;
