---
title: Monitoring
slug: monitoring
---

Aside from the correct behavior of your system, you may also be interested in the actual performance of user interactions with the system.

<img src="/images/content/execution.svg" alt="Hierachrchy of an end-2-end application monitoring test-suite with performance data, execution times and thresholds" style="max-height: 400px" />

## First to Know, First to Act
Identifying possible performance bottlenecks - before your users will - is a critical task for operators and administrators. Sakuli makes it possible to integrate such __real-world__ performance analysis in an automated way. To achieve this, Sakuli provides a generic forwarder interface which receives the latest results of a test run. The result is a detailed object that contains information about every step in your e2e scenario, including execution time and error descriptions that can be send to virtually any endpoint.

Our [enterprise plans](/enterprise) include a set of implementations for various monitoring endpoints.
