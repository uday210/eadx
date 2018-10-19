trigger CommandGrammarReindexTrigger on Command__c (after insert, after update) {
    List<Command__c> toReindex = new List<Command__c>();
    CommandGrammarIndexer indexer = new CommandGrammarIndexer();
    for(Command__c command : Trigger.New){
        // Reindex only on isert, or update and the actionable changed
        indexer.reindexCommand(command);
        if (Trigger.isInsert || 
            (Trigger.OldMap.get(command.Id).CommandActionable__c != command.CommandActionable__c) || 
            (Trigger.OldMap.get(command.Id).CommandTarget__c != command.CommandTarget__c)){
            indexer.reindexCommand(command);
        }
    }
}