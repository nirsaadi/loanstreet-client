import axios from 'axios';

class LoansService{
    constructor(){
        this.path="http://localhost:8081/loans";
    }

    getLoans(id, callback){
        let URI = this.path;
        if (id !== null || id !== ""){
            URI= URI+'/'+id;
        }

        const axi = axios.get(URI);

        return axi.then(response => {
        console.log(response);
        callback(response,"get");}
        )
        .catch(error => {
            callback(error,"error");
        });
    }

    createLoan(values, callback){
        const axi = axios.post(this.path,values);

        return axi.then(response => {
            callback(response,"create");}
        ).catch(error => {
                    callback(error,"error");
                }
         );
    }

    updateLoan(values, callback){
            const axi = axios.put(this.path,values);

            return axi.then(response => {
            callback(response,"update");}
            )
            .catch(error => {
                        callback(error,"error");
                    });
        }

}

export default new LoansService();