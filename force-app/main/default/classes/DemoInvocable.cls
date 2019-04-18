global with sharing class DemoInvocable{
    
    @InvocableMethod(
        label='Demo' 
        description='Demo Invocable'
    )
    global static List<Response> performOperation(List<Request> requests){
        return new DemoInvocable(requests.get(0)).doAutoInvoke();
    }
            
    global class Request{    
        @InvocableVariable(required=true)
        global String accountName;        
    }
    
    global class Response{
        @InvocableVariable
        global String result;
    }
    
    private final Request request;
    public DemoInvocable(Request request){
        this.request = request;
        if (null != this.request){
            String msg = 'Account Name: ' + this.request.accountName;
            System.debug(msg);
        }
    }

    public DemoInvocable(){
        this(null);
    }
    
    public List<Response> doAutoInvoke(){
        if (null == this.request){
            Exception e = new NullPointerException();
            e.setMessage('Invocable request not set.');
            throw e;
        }

        String account = request.accountName;

        Response response = new Response();
        response.result = 'Foo';

        List<Response> rv = new List<Response>();
        rv.add(response);
        
        return rv;

    }
    
}