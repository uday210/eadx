global with sharing class AnalyticsDatatableController {

    @AuraEnabled
    global static String execQuery(String query) {
        //System.debug('query: ' + query);
        ConnectApi.LiteralJson result =  ConnectApi.Wave.executeQuery(query);
        //System.debug('result: ' + result);
        //System.debug('json: ' + result.json);
        return result.json;
    }
    
    @AuraEnabled
    public static String getUIThemeDescription() {
        String theme = UserInfo.getUiThemeDisplayed();
        return theme;
    }
}