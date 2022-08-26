import { LightningElement,api, wire , track} from 'lwc';
import {refreshApex} from '@salesforce/apex';  
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import deleteAccount from '@salesforce/apex/AccountController.deleteAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Account from '@salesforce/schema/Account';
import Id from '@salesforce/schema/Account.Id';
import Name from '@salesforce/schema/Account.Name';
import BillingAddress from '@salesforce/schema/Account.BillingAddress';
import Industry from '@salesforce/schema/Account.Industry';
import Phone from '@salesforce/schema/Account.Phone';
import BillingCountry from '@salesforce/schema/Account.BillingCountry';
import BillingCity from '@salesforce/schema/Account.BillingCity';
import BillingStreet from '@salesforce/schema/Account.BillingStreet';
import BillingState from '@salesforce/schema/Account.BillingState';
import BillingPostalCode from '@salesforce/schema/Account.BillingPostalCode';
const COLUMNS = [
   
    { label: 'Account Name', fieldName: Name.fieldApiName, type: 'text' },
    { label: 'Billing Country', fieldName: BillingCountry.fieldApiName,type: 'text' },
    { label: 'Billing Street', fieldName: BillingStreet.fieldApiName,type: 'text' },
    { label: 'Billing State', fieldName: BillingState.fieldApiName,type: 'text' },
    { label: 'Billing PostalCode', fieldName: BillingPostalCode.fieldApiName,type: 'text' },
    { label: 'Billing City', fieldName: BillingCity.fieldApiName,type: 'text' },
    { label: 'Industry', fieldName: Industry.fieldApiName,type: 'text'},
    { label: 'Phone No', fieldName: Phone.fieldApiName,type: 'text' }
];
export default class AccountCreate extends LightningElement {
    objectApiName = Account;
    @track page = 1;
    @track  newAccount= false;
    @track next;

    totalRecords;
    showRecords;
    @track pageSize = 5;
    @track editAccount = false;
    selectedRecord;
    columns = COLUMNS;
    fields = [Id,Name,BillingAddress,Industry,Phone];

    @wire(getAccounts)
    accounts;
//    wiredAccount({data}){
//     if(data){
//         this.totalRecords=data
//         this.showRecords=this.totalRecords.slice(0,this.pageSize)
//         console.log(this.totalRecords)
//     }
//    }

    connectedCallback(){
    
        this.newAccount=true;
    
    }
   
    handleSuccess(event) {
        this.newAccount=true
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Account Created Successful: "+event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        return refreshApex(this.accounts)

    }
    handleUpdate(event) {
        this.newAccount=true
        this.editAccount=false;
        this.selectedRecord=false;
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Account Updated Successful: "+event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        return refreshApex(this.accounts)
    }
    handleRowSelection = event => {
        this.newAccount=true;
            var selectedRows=event.detail.selectedRows;
            this.selectedRecord=selectedRows[0];
        return refreshApex(this.accounts)
    }
    nextHandler(){
        this.next=this.totalRecords.slice(0,this.pageSize)
        console.log(this.totalRecords.slice(0,this.pageSize))
    }

    deleteRecord(){  
        this.newAccount=true;
        this.editAccount=false;
        var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();  
        deleteAccount({accounts: selectedRecords})  
        .then(result=>{  
            return refreshApex(this.accounts);  
        })  
        .catch(error=>{  
            alert('Account did not got delete'+JSON.stringify(error));  
            
        })  
        return refreshApex(this.accounts)
    }  

    handleEdit(){
        this.editAccount=true;
        // this.selectedRecord=false;
    }

}