public with sharing class PaginationController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getOpps( String searchKey, String sortBy,       String sortDirection) {
       
        String query = 'SELECT Id, Name,BillingCountry,BillingCity,BillingPostalCode,BillingStreet,BillingState,Phone, Industry FROM Account';
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        query = query + ' LIMIT 10';
        return Database.query( query );
    }
}
