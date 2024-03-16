import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // console.log(userAccount);

      if (userAccount) {
        //call another function to login the user
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // console.log("In login", email);
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      // Check if the user is authenticated
      const isAuthenticated = await this.account.get();

      if (isAuthenticated) {
        // User is authenticated, fetch their account information
        return await this.account.get();
      } else {
        // User is not authenticated, return null or throw an error
        return null; // or throw new Error("User not authenticated");
      }
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authservice = new Authservice();

export default authservice;
