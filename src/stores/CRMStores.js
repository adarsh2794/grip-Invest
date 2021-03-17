import axios from 'axios'
import { action, makeObservable, observable } from 'mobx'

export class CRMStores {
    constructor() {
        this.clients = []
        this.owners =  ["SKODA","YAMAHA","VOLVO"]
        this.assetType = ["CAR","BIKE","BUS"]
        this.searchParamters = this.getSearchParameters()
        
        makeObservable(this, {
            clients: observable,
            owners: observable,
            assetType: observable,
            getClients: action,
            getOwners: action,
            addClient: action,
            searchParamters:observable
            
        })
    }
    /**
    * This is called by Client.js on useEffect function so that it fetches the client data and sets in the
    * global varibale of this class
    */
    async getClients() {
        let data = await axios.get("http://localhost:3002/clients")
        console.log("Successfully data derived",data);
        this.clients = data.data;
    }
    
    async getSearchedClients(searchedParameters) {
        console.log("Data received",searchedParameters);
        let requestBody = {
            searchParamters:searchedParameters,
            assetType:this.assetType,
            ownerType:this.ownerType
        }
        let data = await axios.post("http://localhost:3002/clients/search",requestBody)
        console.log("Successfully data derived",data);
        this.clients = data.data;
    }
    getSearchParameters()
    {
        let searchObj = [];
        this.owners.forEach((owner)=>{
            searchObj.push({key:"Owner","value":owner})
        })
        this.assetType.forEach((asset)=>{
            searchObj.push({key:"Asset Type","value":asset})
        })
        return searchObj;
    }
    async getOwners() {
        return  this.owners;
    }
    
    async getAssetTypes() {
        return  this.assetType;
    }
    
    async addClient(newClient) {
        await axios.post('http://localhost:3002/client', newClient)
        alert("New client created Successfully");
        this.getClients()
    }
    //TODO:We can extend to update the owner and update the selling status of the client Asset
    async updateOwner(name, newOwner) {
        await axios.put(`http://localhost:3002/client/${name}`, newOwner)
        this.getClients()
    }
    
    async updateSold(name, newValue) {
        await axios.put(`http://localhost:3002/client/${name}`, newValue)
        this.getClients()
    }
    
}

