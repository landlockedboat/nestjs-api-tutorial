import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable({})
export class AuthService {

    signup() {

        return {msg: "signed up"}

    }

    signin() {
        return {msg: "signed in"}
    }
}

