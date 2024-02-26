---
description: A guide on configuring Storage Spaces Direct on a 2-node Failover Cluster
unlisted: false
tags:
  - Windows Server
  - PowerShell
  - Storage Spaces Direct
keywords:
  - Windows Server
  - PowerShell
  - Storage Spaces Direct
last_update:
  date: 2/9/2024
  author: Mecken Swyter
---
import Image from '@theme/IdealImage';

# Configure Storage Spaces Direct (S2D)

In this guide we will be configuring Storage Spaces Direct (S2D) on a 2-node Windows Failover Cluster. This Home Lab consists of 2 HP EliteDesk 800 35W G3 Desktop Mini PCs.

:::note

In this scenario, we only have 2 physical machines available for our lab, and Failover Cluster nodes must be joined to a domain. Initially, each node was made a domain controller - and this is a supported scenario with Windows Failover Cluster; however, it was discovered that Storage Spaces Direct can not be configured on domain controllers.

To circumvent this, we will create a domain controller as a VM using Hyper-V on the physical machine, join the nodes to the domain, then later on move the VM(s) to the cluster for high availability.
:::

:::info

If Hyper-V hasn't already been enabled, it can be enabled running the cmdlet below in PowerShell as an Administrator.

```powershell title="PowerShell"
Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart
```
:::

### Step 1: Configure Windows Failover Cluster

1. Install the Windows Failover Cluster feature
```powershell title="PowerShell"
Install-WindowsFeature –Name Failover-Clustering –IncludeManagementTools
```
2. Validate the cluster nodes to confirm all hardware is ready for Failover Clustering and Storage Spaces Direct.
```powershell title="PowerShell"
Test-Cluster -Node hci-svr1, hci-svr2 -Include "Storage Spaces Direct", Inventory, Network, "System Configuration"
```
:::note

Warnings are to be expected - especially if using consumer grade hardware as in this lab. As long as the validation does not report any failures, the cluster and S2D storage pool shouldn't have any problems being created.
:::

3. Create the cluster and assign an IP address. Do not attach storage to the cluster - this will be configured in a subsequent step using Storage Spaces Direct.
```powershell title="PowerShell"
New-Cluster -Name S2DCluster -Node hci-svr1, hci-svr2 -NoStorage -StaticAddress 192.168.10.14
``` 
### Step 2: Create an S2D storage pool and add eligible disks

1. Enable an S2D cluster. 
```powershell title="PowerShell" title="PowerShell"
Enable-ClusterS2D -CacheState Disabled -Autoconfig:0 -SkipEligibilityChecks -Confirm:$false
``` 
This Cmdlet is disabling the S2D caching functionality, declining the autoconfig, and skipping any eligibility checks. This deployment does not support the minimum number of disks to enable caching; however, in an all NVMe deployment, it would be recommended to disable caching anyway as it is best utilized when there is a mix of different types of drives.