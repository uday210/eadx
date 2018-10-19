trigger ActionablePhraseGrammarReindexTrigger on ActionablePhrase__c (after insert, after update, after delete) {
    CommandGrammarIndexer indexer = new CommandGrammarIndexer();
    if (Trigger.isUpdate || Trigger.isInsert){
       ActionablePhrase__c actionablePhrase = Trigger.New.get(0);
       indexer.reindexActionable(actionablePhrase.Actionable__c);
    }
    else{
       ActionablePhrase__c actionablePhrase = Trigger.Old.get(0);
       indexer.reindexActionable(actionablePhrase.Actionable__c);
    }
}