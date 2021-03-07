import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

class Users {
  constructor(private users: IUser[]) {}

  logger() {
    console.log(this.users);
  }

  async loginCheck(user: IUser): Promise<boolean> {
    for (let i of this.users) {
      if (i.email === user.email) {
        const match = await bcrypt.compare(user.password, i.password);
        if (match) return true;
      }
    }
    return false;
  }

  async registerUser(user: IUser): Promise<boolean> {
    try {
      // Hashing the password
      const hash = await bcrypt.hash(user.password, 10);
      if (hash) {
        // storing the password
        this.users.push({ email: user.email, password: hash });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

// Exporting a entity
export default new Users([]);
