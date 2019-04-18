({
	init: function(component, event, helper) {
        let saql = "";
        saql += "q = load \"0FbB0000000BWZRKA4/0FcB00000024FibKAE\";";
		saql += "q = foreach q generate 'Id' as 'Id', 'Amount' as 'Amount', 'ForecastCategory' as 'ForecastCategory', 'LeadSource' as 'LeadSource', 'StageName' as 'StageName';";
		saql += "q = limit q 1000;";
        component.set('v.saql', saql);
	}
})