public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [
            SELECT Id,Name, BillingCountry,BillingCity,BillingPostalCode,BillingStreet,BillingState, Industry,Phone
            FROM Account
        ];
    }

    @AuraEnabled  
    public static void deleteAccount(List<Account> accounts){  
      delete accounts;  
    }  
    
}
