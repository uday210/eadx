<aura:application extends="ltng:outAppUnstyled" access="global">
    <aura:dependency resource="wave:waveDashboard"/>
    <aura:dependency resource="wave:sdk"/>
    <aura:dependency resource="c:sdkTab"/>
    <aura:dependency resource="c:analyticsDashboardViewer"/>
    <aura:dependency resource="c:analyticsTree"/>
    <aura:dependency resource="c:templateManager"/>
    <aura:dependency resource="c:myDatatable"/>
    <aura:dependency resource="c:analyticsTreeSelection" type="EVENT"/>
    <aura:dependency resource="eadx:datableRowSelection" type="EVENT"/>
    <!--
    <aura:dependency resource="c:waveEventMonitor"/>
    <aura:dependency resource="c:filterTest"/>
    <aura:dependency resource="c:selectionTest"/>
    <aura:dependency resource="c:eaPlatformEventTab"/>
    <aura:dependency resource="c:imageMapTest"/>
  	-->
</aura:application>