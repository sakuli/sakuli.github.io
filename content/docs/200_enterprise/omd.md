---
title: OMD / Gearman Forwarder
weight: 300
---

Add the forwarder to your project with:

{{<highlight bash>}}
SAKULI_LICENSE_KEY=<PERSONAL_NPM_ACCESS_TOKEN> npm i @sakuli/forwarder-gearman
{{</highlight>}}

To register the forwarder in your project you have edit the `package.json` file and add the preset to the sakuli configuration key:

{{<highlight json>}}
{
    "sakuli": {
        "presetProvider: [
            "@sakuli/legacy",
            "@sakuli/forwarder-gearman"
        ]
    }
}
{{</highlight>}}

## Configure OMD

Sakuli transmits performance data to a **Gearman result queue** rather than to OMD directly. So a gearman-enabled monitoring system in a OMD environment is required.

It takes a few steps in the monitoring system in order to process Sakulis performance data correctly.

### Enable and configure mod-gearman

Use the Makefile located in `OMD_ROOT/share/sakuli/omd/` to configure mod_gearman:

- enable all services for mod_gearman
- set the bind IP and port (default: `0.0.0.0:4730`; overwrite with e.g. `export GEARMAND_PORT=192.168.130.10:4731`)
- set the encryption key (default: `sakuli_secret`; overwrite with e.g. `export GEARMAN_SECRET=mykey`)

Then run:

{{<highlight bash>}}
su - <SITE_USER>
cd ~/share/sakuli/setup/omd
make gearman
{{</highlight>}}

{{%alert%}}
For security reasons, the Makefile will only configure mod-gearman if it is not enabled yet. If it is already enabled inspect the Makefile, read the steps carefully and execute the steps by hand.
{{%/alert%}}
{{% alert %}}
For **PRODUCTION** usage please use individual encryption key!
{{% /alert %}}

If you do not want to use encryption at all enable accept_clear_results and disable sakuli.forwarder.gearman.encryption:

{{<highlight bash>}}
vim ~/etc/mod-gearman/server.cfg
...
accept_clear_results=yes
{{</highlight>}}

`testsuite.properties`
{{<highlight properties>}}
sakuli.forwarder.gearman.encryption=false
{{</highlight>}}

### Gearman proxy (optional)

Use the Sakuli gearman proxy script if you want to intervene into the communication between Sakuli and Naemon/Nagios.

Possible use cases:

- Change parts of the messages Sakuli sends to the monitoring system ⇒ there are some examples contained already
- Getting notified when Sakuli sends results to services which do not exists
- Auto-create services for incoming results (not yet implemented)

Use the Makefile located in `$OMD_ROOT/share/sakuli/` to enable the feature:

{{<highlight bash>}}
su - <SITE_USER>
cd n/share/sakuli/setup/omd
make gearman_proxy
{{</highlight>}}

Edit `etc/mod-gearman/sakuli_gearman_proxy.cfg`

{{<highlight cfg>}}
$remoteHost="172.17.0.2"; #1
$remotePort="4730"; #1
$localHost="172.17.0.2"; #2
$localPort="4730"; #2
$queues = {
    "$remoteHost:$remotePort/check_results_sakuli"  => "$localHost:$localPort/check_results",
}; # 3 + 4

$err_h = 'error_host'; #5
$err_s = 'eror_svc';
$err_r = '2'; #6
{{</highlight>}}

1. Gearman IP/Port listening for Sakuli results. Set this to the same values as <2> unless gearman_proxy.pl is running on another system.
2. Gearman IP/Port of the monitoring system
3. check_results_sakuli ⇒ queue name to receive Sakuli results. Make sure this queue name is defined in property sakuli.forwarder.gearman.server.queue on all Sakuli clients (see Sakuli Client Configuration)
4. check_results ⇒ default queue of mod-gearman where gearman workers write back their results. (no need to change that)
5. The proxy does a livestatus query for each incoming package to ensure that the receiving host/service exists. Provide a special "error host/service" pair where the proxy can send a message when there are results coming in for non-existent services.
6. Status of messages for non-existent services (2=CRITICAL)

{{<highlight bash>}}
su - <SITE_USER>
omd start sakuli_gearman_proxy
# Starting sakuli_gearman_proxy...OK
{{</highlight>}}

Check that the queue `check_results_sakuli` is running in addition to the default queue `check_results`.

{{<highlight bash>}}
OMD[demo]:~$ gearman_top
2017-06-09 13:37:28  -  localhost:4730  -  v0.33

 Queue Name           | Worker Available | Jobs Waiting | Jobs Running
-----------------------------------------------------------------------
 check_results        |               1  |           0  |           0
 check_results_sakuli |               1  |           0  |           0
-----------------------------------------------------------------------

{{</highlight>}}

{{% alert %}}
This change does affect other monitoring checks executed with mod-gearman, because only Sakuli will send results into the queue check_results_sakuli.
{{% /alert %}}

### Create a Nagios service

Create a service which should receive Sakuli test results. Host/service names derive from the following properties:

- **host**: `sakuli.forwarder.gearman.nagios.hostname` (defined globally or per suite)
- **service**: `testsuite.id` (defined in `testsuite.properties`)

OMD Configuration:

{{<highlight cfg>}}
define host {
  host_name                      sakuli_client
  alias                          sakuli_client
  address                        __SAKULI_CLIENT_IP__
  use                            generic-host
}

define service {
  service_description            example_xfce
  host_name                      sakuli_client
  use                            tpl_s_sakuli_gearman
  freshness_threshold            180
}
{{</highlight>}}

> freshness_threshold should be slightly higher than the interval Sakuli tests are executed

The check is waiting now for check results from a Sakuli client.

## Sakuli Configuration

On the Sakuli client you must set the global properties for the gearman receiver. For this, edit sakuli.properties in the folder containing the test suites:

| Property   |      Default      |  Effect |
|----------|-------------|------|
| `sakuli.forwarder.gearman.enabled` | `false` | Enables forwarding to OMD |
| `sakuli.forwarder.gearman.encryption` | `true` | Enable encryption and set the key only if you did not activate accept_clear_results in mod_gearman. Otherwise, set encryption to false. |
| `sakuli.forwarder.gearman.secret.key`| `secret-password` | The password configured in [Enable and configure mod-gearman](#enable-and-configure mod-gearman) |
| `sakuli.forwarder.gearman.server.host`| | The host where OMD is running |
| `sakuli.forwarder.gearman.server.port`| `4730` | The port where Gearman is listing (configured in [Enable and configure mod-gearman](#enable-and-configure mod-gearman)) |
| `sakuli.forwarder.gearman.server.queue`| `check_results` | The default queue for sakuli |
