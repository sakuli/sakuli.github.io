---
title: Icinga2 Forwarder
weight: 100
---

Add the forwarder to your project with:

{{<highlight bash>}}
SAKULI_LICENSE_KEY=<PERSONAL_NPM_ACCESS_TOKEN> npm i @sakuli/forwarder-icinga2
{{</highlight>}}

To register the forwarder in your project you have edit the `package.json` file and add the preset to the sakuli configuration key:

{{<highlight json>}}
{
    "sakuli": {
        "presetProvider: [
            "@sakuli/legacy",
            "@sakuli/forwarder-icinga2"
        ]
    }
}
{{</highlight>}}

## Enable the Icinga2 API
The steps to enable the Icinga2 API are described in the [REST API documentation](http://docs.icinga.org/icinga2/snapshot/doc/module/icinga2/chapter/icinga2-api).

## Create a Icings2 service

Create a `check_command`, which will be executed only if Icinga did not receive a Sakuli result within a certain time. This ensures that you get a notification even if no passive check results arrive in Icinga at all:

`/etc/icinga2/conf.d/commands.conf`
{{<highlight conf>}}
object CheckCommand "check_dummy" {
   import "plugin-check-command"
   command = [
     PluginDir + "/check_dummy","$dummy_state$","$dummy_text$"
   ]
   vars.dummy_state = 0
   vars.dummy_text = "Check was successful."
}

object CheckCommand "check_sakuli" {
   import "check_dummy"
   vars.dummy_state = 3
   vars.dummy_text = "No passive Sakuli check result received."
}
{{</highlight>}}

`/etc/incinga2/conf.d/hosts.conf`
{{<highlight conf>}}
object Host "sakuliclient01" {
   import "generic-host"
   address = "<IP>"
}
{{</highlight>}}

Create the following service object for the first test case. freshness_threshold should be slightly higher than the interval Sakuli tests are planned.

{{<highlight conf>}}
object Service "sakuli_demo" {
  import "generic-service"
  host_name = "sakuliclient01"
  check_command = "check_sakuli"
  enable_active_checks = 0
  enable_passive_checks = 1
  enable_flapping = 0
  volatile = 1
  enable_perfdata = 1
}
{{</highlight>}}

Reload Icinga2:

{{<highlight bash>}}
service icinga2 reload
{{</highlight>}}

Now open Icingaweb2; you should see the Sakuli host with the service "sakuli_demo" attached.

The check is waiting now for check results from a Sakuli client.

## Sakuli Client Configuration

On the Sakuli client you must set the global properties for the Icinga2 receiver. For this, edit `sakuli.properties` in the folder containing the test suites:

| Property | Default | Effect |
|----------|---------|--------|
|`sakuli.forwarder.icinga2.enabled` | `false`| Enables result forwarding to Icinga2 |
|`sakuli.forwarder.icinga2.api.host`| | The hostname or ip of the Icinga API-Endpoints|
|`sakuli.forwarder.icinga2.api.port`| `5665` | The port or ip of the Icinga API-Endpoints|
|`sakuli.forwarder.icinga2.api.username` | | API user name |
|`sakuli.forwarder.icinga2.api.password` | | API user password |
|`sakuli.forwarder.icinga2.hostname`| | The name of the host object configured in Icinga2 |
