class accountApi{
    constructor(baseURL) {
        this.baseURL=baseURL;
        this.getOption = {
            method : "get"
        }
        this.postOption = {
            method : "post",
            headers : {
                'content-type': 'application/json'
            }
        }
    }

    //로그인
    async auth(email,password){
        const res = await fetch(this.baseURL+"/api/account/auth",{
            ...this.postOption,
            body : JSON.stringify({email, password}),
        });
        const json = await res.json();
        return json;
    }

    /* 그냥 npm cors를 설치하지않고 no-cors 를 이용해서 다른 확장자에서 접속하도록 하는거 연구중..
    async loginx(email,password){
        var formBody = [];
        var details = {email, password};
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const res = await fetch(`${this.baseURL}/api/login`,{
            method : "POST",
            body : formBody,
            mode : "no-cors",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
        // const json = await res.json();
        return res;
    }
     */


    //회원가입
    async accountRegister(email, password, name, nick , gender, birth){    
        console.log(this.baseURL)
        const res = await fetch(this.baseURL+"/api/account/register",{
            ...this.postOption,
            body : JSON.stringify({email,password, name, nick , gender, birth}),
        });
        const json = await res.json();
        return json;
    }

    async vaild(token){
        const res = await fetch(this.baseURL+"/api/account/vaild",{
            ...this.postOption,
            body : JSON.stringify({token})
        })
        const json = await res.json();
        return json;
    }

}
 
export default accountApi;