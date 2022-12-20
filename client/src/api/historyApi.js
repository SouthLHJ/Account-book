class historyAPI {
    constructor(baseURL) {
        this.baseURL=baseURL;
        const token = localStorage.getItem("token");
        this.getOption = {
            method : "get",
            headers : {
                "authorization" : "Bearer" + token
            }
        }
        this.postOption = {
            method : "post",
            headers : {
                'content-type': 'application/json',
                "authorization" : "Bearer" + token
            }
        }
    }

    //조회
    async historySearch(dateMonth){
        const res = await fetch(this.baseURL+"/api/history/search",{
            ...this.postOption,
            body : JSON.stringify({...dateMonth})
        })
        return await res.json();
    }

    //리포트 분야별 조회
    async ReportPostSearch(data,token){
        const res = await fetch(this.baseURL+"/api/history/report",{
            ...this.postOption,
            body : JSON.stringify({...data,token})
        })
        return await res.json();
    }
    async ReportGetSearch(data){
        const res = await fetch(this.baseURL+`/api/history/report?startDate=${data.startDate}&endDate=${data.endDate}&token=${localStorage.getItem("token")}`,{
            ...this.getOption
        })
        return await res.json();
    }

    //입력
    async historyInput(data){
        const res = await fetch(this.baseURL+"/api/history/write",{
            ...this.postOption,
            body : JSON.stringify({data})
        })
        return await res.json();
    }

    //삭제
    async historyDelete(data,token){
        const res  = await fetch(this.baseURL+"/api/history/delete",{
            ...this.postOption,
            body : JSON.stringify({data,token})
        })
        return await res.json();
    }

    //수정
    async historyEdit(id,datas,token){
        const res  = await fetch(this.baseURL+"/api/history/edit",{
            ...this.postOption,
            body : JSON.stringify({id,datas,token})
        })
        return await res.json();
    }


}
 
export default historyAPI;