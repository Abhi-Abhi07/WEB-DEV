import conf from "../conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId); // project ID 
        
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // call another method or login method
                return this.login(email,password);
            }else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            // Logged in
            const user = await this.account.get();
            return user;
        } catch (error) {
            // Not logged in
            console.log("Appwrite service :: getCurrentUser :: error ",error);
        }
        return null;
    }

    async logout(){
        try {
            // Logged out
            return await this.account.deleteSessions();
        } catch (error) {
            // Not logged out
            console.log("Appwrite service :: logout :: error ",error);
        }
    }


}

const authService=new AuthService();

export default authService;
