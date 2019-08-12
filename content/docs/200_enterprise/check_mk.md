---
title: Check_MK Forwarder
weight: 200
---

Add the forwarder to your project with:

{{<highlight bash>}}
SAKULI_LICENSE_KEY=<PERSONAL_NPM_ACCESS_TOKEN> npm i @sakuli/forwarder-check_mk
{{</highlight>}}

To register the forwarder in your project you have to edit the `package.json` file and add the preset to the sakuli configuration key:

{{<highlight json>}}
{
    "sakuli": {
        "presetProvider: [
            "@sakuli/legacy",
            "@sakuli/forwarder-check_mk"
        ]
    }
}
{{</highlight>}}

## Sakuli Client Configuration

It is assumed that the client is already monitored by Check_MK and that an agent is installed and running on it.

### Spool folder

Create a new folder `spool` in the installation path of the Check_MK agent. This is the folder where the results will be written and stored into. Don't forget to grant writing permissions for the folder to the user running Sakuli checks.

### Forwarder configuration

Now set the properties for the Check_MK receiver. For this, edit sakuli.properties in the folder containing the test suites:

|Property| Default| Effect|
|--------|--------|-------|
|`sakuli.forwarder.check_mk.enabled`|`false`|Enables writing to spool file|
|`sakuli.forwarder.check_mk.spooldir`|`/var/lib/check_mk_agent/spool` (Linux)<br/>`<CMK_installation_path>\\spool` (Windows)|Path to the spool folder as defined above. On Windows, the backslashes have to be escaped with \. Check_MK is expecting the result files from Sakuli in here.|
|`sakuli.forwarder.check_mk.freshness`|`600`|Defines the maximal age in seconds in which the result is still valid. If the last modification of the result file is older than this property, the result file will be ignored. The Check_MK service will turn into UNKNOWN.|
|`sakuli.forwarder.check_mk.spoolfile_prefix`|`sakuli_suite_`|Defines the result file prefix. It can be used to change the default naming convention for the Check_MK output files|
|`akuli.forwarder.check_mk.service_description`|`${testsuite.id}`|Defines the service description which is used within the check result|

An example configuration could look like this:

{{<highlight properties>}}
sakuli.forwarder.check_mk.enabled=true
sakuli.forwarder.check_mk.spooldir=/var/lib/check_mk_agent/spool
sakuli.forwarder.check_mk.freshness=600
sakuli.forwarder.check_mk.spoolfile_prefix=sakuli_suite_
sakuli.forwarder.check_mk.service_description=My_Custom_Service
{{</highlight>}}
