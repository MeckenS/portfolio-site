---
description: A guide on configuring Azure PowerShell to manage resources in Azure.
unlisted: false
tags:
  - Azure
  - PowerShell
keywords:
  - Azure
  - PowerShell
last_update:
  date: 2/25/2024
  author: Mecken Swyter
---
import Image from '@theme/IdealImage';

# Configure Azure PowerShell

Using the Azure Portal to create and manage resources can be beneficial for one-off tasks and learning about different services offered in Azure; however, it becomes more practical to take advantage of a scripting language such as PowerShell for management of tasks as it allows the use of one-liner syntax, piping outputs, and scripting.

:::info
It is recommended to use PowerShell 7. If not already installed on the management machine, instuctions on installing the latest version of PowerShell 7 can be found [here](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4).
:::

## Install Azure PowerShell
Navigate to PowerShell, Run as an administrator, and install the Azure PowerShell module using the following command:
```powershell title="PowerShell"
Install-Module az -Scope AllUsers -Force
```
## Authenticate to Azure
Authenticate to an Azure tenant. This method will involve the `Az` PowerShell module opening a web browser window to authenticate with an account that has rights to a Azure subscription.
```powershell title="PowerShell"
Connect-AzAccount
```

The following cmdlets can be useful to confirm the context of the tenant and subscription actively being managed as one account can be used to manage multiple tenants and Azure subscriptions.
```powershell title="PowerShell"
Get-AzContext
Get-AzContext -ListAvailable
Get-AzSubscription
```
## Find Azure commands
Here we will use the `Get-Command` cmdlet to retrieve available cmdlets that contain the `Get` verb, `AzVM` contained in the noun, and are apart of the `Az.Compute` module.

```powershell title="PowerShell"
Get-Command -Verb Get -Noun AzVM* -Module Az.Compute
```
```powershell title="Output"
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           Get-AzVmssDiskEncryptionStatus                     7.1.1      Az.Compute
Alias           Get-AzVmssVMDiskEncryptionStatus                   7.1.1      Az.Compute
Cmdlet          Get-AzVM                                           7.1.1      Az.Compute
Cmdlet          Get-AzVMAccessExtension                            7.1.1      Az.Compute
Cmdlet          Get-AzVMADDomainExtension                          7.1.1      Az.Compute
Cmdlet          Get-AzVMAEMExtension                               7.1.1      Az.Compute
Cmdlet          Get-AzVMBootDiagnosticsData                        7.1.1      Az.Compute
Cmdlet          Get-AzVMChefExtension                              7.1.1      Az.Compute
Cmdlet          Get-AzVMCustomScriptExtension                      7.1.1      Az.Compute
Cmdlet          Get-AzVMDiagnosticsExtension                       7.1.1      Az.Compute
Cmdlet          Get-AzVMDiskEncryptionStatus                       7.1.1      Az.Compute
Cmdlet          Get-AzVMDscExtension                               7.1.1      Az.Compute
Cmdlet          Get-AzVMDscExtensionStatus                         7.1.1      Az.Compute
Cmdlet          Get-AzVMExtension                                  7.1.1      Az.Compute
Cmdlet          Get-AzVMExtensionImage                             7.1.1      Az.Compute
Cmdlet          Get-AzVMExtensionImageType                         7.1.1      Az.Compute
Cmdlet          Get-AzVMImage                                      7.1.1      Az.Compute
Cmdlet          Get-AzVMImageOffer                                 7.1.1      Az.Compute
Cmdlet          Get-AzVMImagePublisher                             7.1.1      Az.Compute
Cmdlet          Get-AzVMImageSku                                   7.1.1      Az.Compute
Cmdlet          Get-AzVMRunCommand                                 7.1.1      Az.Compute
Cmdlet          Get-AzVMRunCommandDocument                         7.1.1      Az.Compute
Cmdlet          Get-AzVMSize                                       7.1.1      Az.Compute
Cmdlet          Get-AzVMSqlServerExtension                         7.1.1      Az.Compute
Cmdlet          Get-AzVmss                                         7.1.1      Az.Compute
Cmdlet          Get-AzVmssDiskEncryption                           7.1.1      Az.Compute
Cmdlet          Get-AzVmssRollingUpgrade                           7.1.1      Az.Compute
Cmdlet          Get-AzVmssSku                                      7.1.1      Az.Compute
Cmdlet          Get-AzVmssVM                                       7.1.1      Az.Compute
Cmdlet          Get-AzVmssVMDiskEncryption                         7.1.1      Az.Compute
Cmdlet          Get-AzVmssVMRunCommand                             7.1.1      Az.Compute
Cmdlet          Get-AzVMUsage                                      7.1.1      Az.Compute
```

