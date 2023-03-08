import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import {createHash,isValidPassword} from '../utils.js';
import githubService from 'passport-github2';

//const localStrategy = local.Strategy;
const initPassport =() =>
{
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });
    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id);
        done(null,user);
    })


    passport.use('github', new githubService({
        clientID: "Iv1.40ec8ba414efaa03",
        clientSecret: "597288a2f3db38fedb9859869766a574f7c73b48",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken,refreshToken,profile, done)=>
    { try{

        console.log(profile); 
        let user = await userModel.findOne({email:profile._json.email});
        if(!user){
            let newUser = {
                first_name: profile._json.name,
                last_name: profile._json.name,
                email: profile._json.email,
                age:18,
                password:'prueba',
                role: profile._json.type
            }
            console.log(newUser);
            let result = await  userModel.create(newUser);
            done(null,result)
        }else{
             console.log(user);
            done(null,user)   
        }
    }catch(error){
        return done(error)
    }

    }))

}

export default initPassport;